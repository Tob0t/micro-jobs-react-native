var mongoose    = require("mongoose");
var User        = require("./User");

var ProwoUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    }
}, { discriminatorKey : "_type" });

var ProwoUser = User.discriminator("ProwoUser", ProwoUserSchema);
module.exports = ProwoUser;