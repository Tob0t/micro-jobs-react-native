var mongoose = require("mongoose");

var UserProfile = new mongoose.Schema({
    prename: {
        type: String,
    },
    surname: {
        type: String,
    },
    isMale: {
        type: Boolean
    },
    image:{
        type: String
    }
});

var UserSchema = new mongoose.Schema({
    clientInstances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientInstance",
    }],
    profile: UserProfile,
}, { discriminatorKey : "_type" });

var User = mongoose.model("User", UserSchema);
module.exports = User;

