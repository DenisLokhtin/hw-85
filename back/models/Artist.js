
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
        enum: [true, false]
    },
    description: {
        type: String,
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;