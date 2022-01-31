const express = require('express');
const Track = require('../models/Track');
const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({token: req.get('Authorization')});
        if (req.query.album) {
            if (user && user.role === 'admin') {
                const tracksInAlbum = await Track.find({album: req.query.album}).populate({
                    path: 'album',
                    select: 'name',
                    populate: {path: 'artist', select: 'name'}
                });
                return res.send(tracksInAlbum);
            } else {
                const tracks = await Track.find({published: true});
                return res.send(tracks);
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, async (req, res) => {
    if (!req.body.name || !req.body.duration || !req.body.album) {
        res.status(400).send('Not valid data');
        return
    }

    const track = {
        name: req.body.name,
        duration: req.body.duration,
        album: req.body.album,
        number: req.body.number
    };

    const tracks = new Track(track);

    try {
        await tracks.save();
        res.send(tracks);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        await Track.deleteOne({_id: req.params.id});
        return res.send('Track was deleted')
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const track = await Track.findOne({_id: req.params.id});

        if (!track) {
            res.sendStatus(404);
        }

        track.published = !track.published;

        await track.save();
        res.send(track);
    } catch (e) {
        res.sendStatus(400);
    }
});


module.exports = router;