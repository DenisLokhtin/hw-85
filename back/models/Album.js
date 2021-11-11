const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    file: {
        type: String,
        required: false,
    },
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;