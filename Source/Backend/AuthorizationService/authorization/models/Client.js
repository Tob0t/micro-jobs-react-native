var mongoose = require("mongoose");

var ClientSchema = new mongoose.Schema({
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        unique: true,
        required: true
    }
});

var Client = mongoose.model("Client", ClientSchema);
module.exports = Client;