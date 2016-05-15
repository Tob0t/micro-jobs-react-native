var mongoose = require("mongoose");

var AccessTokenSchema = new mongoose.Schema({
    clientInstanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientInstance",
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
});

var AccessToken = mongoose.model("AccessToken", AccessTokenSchema);
module.exports = AccessToken;