const express = require('express');
const Album = require('../models/Album');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');
const auth = require('../middleWare/auth');
const permit = require('../middleWare/permit');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename(req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const router = express.Router();

const upload = multer({storage});


router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({token: req.get('Authorization')});
        if (req.query.artist) {
            if (user && user.role === 'admin') {
                const artistAlbums = await Album.find({artist: req.query.artist}).populate('artist', 'name');
                return res.send(artistAlbums);
            } else {
                const albums = await Album.find({artist: req.query.artist, published: true}).populate('artist', 'name');
                res.send(albums);
            }
        } else {
            const albums = await Album.find({published: true}).populate('artist', 'name');
            res.send(albums);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist', 'title description');

        if (album) {
            res.send(album)
        } else {
            res.status(404).send('Album not found');
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.year || !req.body.artist) {
        res.status(400).send('Not valid data');
        return
    }

    const newAlbum = {
        name: req.body.name,
        release: req.body.year,
        artist: req.body.artist
    };

    if (req.file) {
        newAlbum.file = req.file.filename;
    }

    const album = new Album(newAlbum);

    try {
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        await Album.deleteOne({_id: req.params.id});
        return res.send('Album was deleted!');
    } catch (e) {
        res.status(500);
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try {
        const album = await Album.findOne({_id: req.params.id});

        if (!album) {
            res.sendStatus(404);
        }

        album.published = !album.published;

        await album.save();
        res.send(album);
    } catch (e) {
        res.sendStatus(400);
    }


})


module.exports = router;