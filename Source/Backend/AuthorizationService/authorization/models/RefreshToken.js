var mongoose = require("mongoose");

var RefreshTokenSchema = new mongoose.Schema({
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

var RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;