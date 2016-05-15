var mongoose = require("mongoose");

var ClientInstanceSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clientId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    identifier: {
        type: String,
        required: true,
    },
    access_token: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "AccessToken",
        required: true
    },
    refresh_token: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "RefreshToken",
        required: true
    }
});

var ClientInstance = mongoose.model("ClientInstance", ClientInstanceSchema);
module.exports = ClientInstance;