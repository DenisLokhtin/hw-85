const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const Track = require('../models/Track');
const auth = require('../middleWare/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const tracks = await TrackHistory.find().populate({path: 'User', select: 'username'}).populate({
            path: 'track', select: 'name',
            populate: {path: 'album', select: 'name', populate: {path: 'artist', select: 'name'}}
        });
        res.send(tracks);
    } catch (e) {
        console.log(e);
        res.status(404).send({error: 'Not Found'});
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const track = await Track.findOne({_id: req.body.track});
        const datetime = new Date().toISOString();

        const trackHistory = new TrackHistory({user_id: req.user._id, track_id: track._id, datetime});
        await trackHistory.save();

        return res.send(trackHistory);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
});

module.exports = router;