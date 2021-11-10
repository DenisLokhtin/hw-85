const express = require('express');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'no token present'})
    }

    const track = await TrackHistory.findOne({token});

    if (!track) {
        return res.status(401).send({error: 'wrong token'})
    }
});

module.exports = router;