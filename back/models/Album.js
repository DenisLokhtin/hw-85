const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    release: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
        enum: [true, false]
    },
    file: {
        type: String,
        required: false,
    },
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;