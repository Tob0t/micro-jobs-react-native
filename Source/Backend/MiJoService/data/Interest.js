var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var InterestSchema = mongoose.Schema({
    provider: {
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
        type: ObjectId,
        default: Date.now
    }
});

module.exports = mongoose.model('Interest', InterestSchema);