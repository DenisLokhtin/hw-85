const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: false,
    },
    information: {
        type: String,
        required: true,
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;