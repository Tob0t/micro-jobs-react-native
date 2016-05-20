var mongoose = require("mongoose");
var User = require("./User");

var MiJoUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    password: {
        type: String,
        required: true
    }
}, {discriminatorKey: "_type"});

var MiJoUserSchema = User.discriminator("MiJoUser", MiJoUserSchema);
module.exports = MiJoUserSchema;