const Album = require('../models/Album');

const router = express.Router();

const upload = require('./routesConfig');

router.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const Albums = await Album.find({artist: req.query.artist}).populate('artist', 'name');
            res.send(Albums);
        } else {
            const Albums = await Album.find().populate('artist', 'name');
            res.send(Albums);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const Albums = await Album.findById(req.params.id).populate('artist', 'name description');

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
    if (!req.body.title || !req.body.release || !req.body.artist) {
        res.status(400).send('Not valid data');
    }

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