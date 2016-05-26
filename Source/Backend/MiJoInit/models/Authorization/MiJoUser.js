module.exports = function (connection) {
    var User = require("./User")(connection);

    var MiJoUserSchema = new connection.base.Schema({
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

    return User.discriminator("MiJoUser", MiJoUserSchema);
};