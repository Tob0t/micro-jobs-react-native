module.exports = function (connection) {
    var User = require("./User");

    var FacebookUserSchema = new connection.base.Schema({
        facebookId: {
            type: String,
            required: true
        },
        facebookAccessToken: {
            type: String,
            required: true
        },
    }, {discriminatorKey: "_type"});

    return User.discriminator("FacebookUser", FacebookUserSchema);
};