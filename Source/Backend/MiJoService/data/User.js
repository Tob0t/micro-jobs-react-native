var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
    id: {
        type: ObjectId,
        required: true,
    },
    offers: {
        type: [ObjectId],
    },
    offers: {
        type: [ObjectId],
    },
    skips: {
        type: [ObjectId],
    }
});

module.exports = mongoose.model('User', UserSchema);