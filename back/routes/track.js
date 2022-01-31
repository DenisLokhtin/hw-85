const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.album) {
            const TracksAlbum = await Track.find({album: req.query.album}).populate('album', 'name');
            res.send(TracksAlbum);
        } else {
            const Tracks = await Track.find(query);
            res.send(Tracks);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const Tracks = await Track.findById(req.params.id);

        if (Tracks) {
            res.send(Tracks);
        } else {
            res.sendStatus(404).send({error: 'Tracks not found'})
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.duration || !req.body.album) {
        res.status(400).send('Not valid data');
    }

    const body = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration
    };

    const tracks = new Track(body);

    try {
        await tracks.save();
        res.send(tracks);
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = router;