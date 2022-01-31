const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tracks = await TrackHistory.find();
        res.send(tracks);
    } catch (e) {
        res.status(401).send({error: 'Not Found'});
    }
});


router.post('/', async (req, res) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).send({error: 'Unauthorized'});
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.status(401).send({error: 'Wrong token'});
        }

        const track = await Track.findOne({_id: req.body.track});

        const datetime = new Date().toISOString();

        const trackHistory = new TrackHistory({user: user._id, track: track._id, datetime});
        await trackHistory.save();

        return res.send(trackHistory);
    } catch (e) {
        return res.send(e);
    }
});

module.exports = router;