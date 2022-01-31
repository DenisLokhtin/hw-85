const express = require('express');
const User = require('../models/User');
const config = require('../config');
const axios = require("axios");
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});


router.post("/", upload.single("image"), async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
    };

    if (req.file) {
        userData.avatarImage = "uploads/" + req.file.filename;
    }

    try {
        const user = new User(userData);

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Email and password correct!', user});
});


router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + "|" + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: "Facebook token incorrect"});
        }

        if (response.data.data.user_id !== req.body.id) {
            return res.status(401).send({global: "User ID incorrect"});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url
            })
        }
        user.generateToken();
        user.save({validateBeforeSave: false});

        return res.send({message: "Success", user});
    } catch (e) {
        return res.status(401).send({global: "Facebook token incorrect"});
    }
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();

    await user.save({validateBeforeSave: false});

    return res.send(success);
});


module.exports = router;