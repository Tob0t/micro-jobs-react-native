module.exports = function (connection) {
    var UserProfile = new connection.base.Schema({
        prename: {
            type: String,
        },
        surname: {
            type: String,
        },
        isMale: {
            type: Boolean
        },
        image: {
            type: String
        }
    });

    var UserSchema = new connection.base.Schema({
        clientInstances: [{
            type: connection.base.Schema.Types.ObjectId,
            ref: "ClientInstance",
        }],
        profile: UserProfile,
    }, {discriminatorKey: "_type"});

    return connection.model("User", UserSchema);
};

