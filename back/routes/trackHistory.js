const express = require('express');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

const AuthorizationCheck = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'Token not provided!'});
    }
    next();
};

router.post('/', AuthorizationCheck,  async (req, res) => {
    const track = await TrackHistory.findOne();

    if (!track) {
        return res.status(401).send({error: 'wrong token'})
    }
});

module.exports = router;