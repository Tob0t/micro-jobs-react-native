var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var OfferSchema = mongoose.Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: [Number],
        index: '2dsphere'
    },
    deadline: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Offer', OfferSchema);