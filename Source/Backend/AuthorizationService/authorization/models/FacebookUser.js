var mongoose    = require("mongoose");
var User        = require("./User");

var FacebookUserSchema = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true
    },
    facebookAccessToken: {
        type: String,
        required: true
    },
}, { discriminatorKey : "_type" });

var FacebookUser = User.discriminator("FacebookUser",FacebookUserSchema);
module.exports = FacebookUser;