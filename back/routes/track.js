const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.album) {
            query.album = req.query.album
        }
        const Tracks = await Track.find(query);
        res.send(Tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const Tracks = await Track.findById(req.params.id).populate('album', 'title artist release');

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
    const body = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration,
        trackId: req.body.trackId
    };

    const tracks = new Track(body);

    try {
        await tracks.save()
        res.send(tracks);
    } catch (e) {
        console.log(e)
        res.sendStatus(400);
    }
});

module.exports = router;