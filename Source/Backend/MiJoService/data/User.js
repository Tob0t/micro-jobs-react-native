var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
    skips: {
        type: [ObjectId],
    },
    offers: {
        type: [ObjectId],
    },
    requests: {
        type: [ObjectId],
    }
});

module.exports = mongoose.model('User', UserSchema);