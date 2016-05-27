module.exports = function (connection) {
    var AccessTokenSchema = new connection.base.Schema({
        clientInstanceId: {
            type: connection.base.Schema.Types.ObjectId,
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

    return connection.model("AccessToken", AccessTokenSchema);
};