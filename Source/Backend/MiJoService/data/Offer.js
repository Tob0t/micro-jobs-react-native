var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Payment = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MONEY', 'SERVICE']
    },
    value : {
        type: String,
    }
});

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
        required: true,
        index: '2dsphere'
    },
    payment: {
        type: Payment,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Offer', OfferSchema);