const express = require('express');
const Album = require('../models/Album');

const router = express.Router();

const upload = require('./routesConfig');

router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.artist) {
            query.artist = req.query.artist;
        }
        const Albums = await Album.find(query);
        res.send(Albums);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const Albums = await Album.findById(req.params.id);

        if (Albums) {
            res.send(Albums);
        } else {
            res.sendStatus(404).send({error: 'Albums not found'})
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    const body = {
        title: req.body.title,
        artist: req.body.artist,
        release: req.body.release,
    };

    if (req.file) {
        body.file = req.file.filename;
    }

    const albums = new Album(body);

    try {
        await albums.save();
        res.send(albums);
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = router;