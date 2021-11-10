const express = require('express');
const Artist = require('../models/Artist');

const router = express.Router();

const upload = require('./routesConfig');

router.get('/', async (req, res) => {
    try {
        const Artists = await Artist.find();
        res.send(Artists);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    const body = {
        title: req.body.title,
        information: req.body.information,
    };

    if (req.file) {
        body.file = req.file.filename;
    }

    const artists = new Artist(body);

    try {
        await artists.save()
        res.send(artists);
    } catch (e) {
        console.log(e)
        res.sendStatus(400);
    }
});

module.exports = router;