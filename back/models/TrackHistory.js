const mongoose = require('mongoose');

const TrackHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    datetime: String
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;