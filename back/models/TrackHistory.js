const mongoose = require('mongoose');

const TrackHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracks',
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;