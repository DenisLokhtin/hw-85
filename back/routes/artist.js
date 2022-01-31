const express = require('express');
const Artist = require('../models/Artist');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');
const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename(req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});


const upload = multer({storage});

const router = express.Router();


router.get('/', async (req, res) => {

    try {
        const user = await User.findOne({token: req.get('Authorization')});
        if (user && user.role === 'admin') {
            const allArtists = await Artist.find();
            return res.send(allArtists);
        }
        const artist = await Artist.find({published: true});
        return res.send(artist);


    } catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const artistsData = {
            name: req.body.name,
            description: req.body.description || null
        };

        if (req.file) {
            artistsData.image = req.file.filename;
        }

        const artist = new Artist(artistsData);

        await artist.save();
        res.send(artist);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        await Artist.deleteOne({_id: req.params.id});
        return res.send('Artist Deleted');
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findOne({_id: req.params.id});

        if (!artist) {
            res.sendStatus(404);
        }


        artist.published = !artist.published;

        await artist.save();
        res.send(artist);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});


module.exports = router;