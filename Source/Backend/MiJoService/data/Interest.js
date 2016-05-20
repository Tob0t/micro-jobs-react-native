var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var InterestSchema = mongoose.Schema({
    offer: {
        type: ObjectId,
        required: true,
    },
    offerer: {
        type: ObjectId,
        required: true,
    },
    taker: {
        type: ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [
            'ACCEPTED',
            'DECLINED',
            'NONE',
        ],
        default: 'NONE'
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Interest', InterestSchema);