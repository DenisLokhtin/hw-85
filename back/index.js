require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const artists = require('./routes/artist');
const albums = require('./routes/album');
const tracks = require('./routes/track');
const users = require('./routes/user');
const track_history = require('./routes/trackHistory');
const bodyParser = require('body-parser');
const config = require('./config');
const exitHook = require('async-exit-hook');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);
app.use('/users', users);
app.use('/track_history', track_history);

const port = 8002;


const run = async () => {
    await mongoose.connect(config.db.url);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });

    exitHook(async (callback) => {
        await mongoose.disconnect();
        console.log('Mongoose disconnected');
        callback();
    });
};

run();


