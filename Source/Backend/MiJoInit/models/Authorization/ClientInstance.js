module.exports = function (connection) {
    var ClientInstanceSchema = new connection.base.Schema({
        userId: {
            type: connection.base.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        clientId: {
            type: connection.base.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },
        identifier: {
            type: String,
            required: true,
        },
        access_token: {
            type: connection.base.Schema.Types.ObjectId,
            ref: "AccessToken",
            required: true
        },
        refresh_token: {
            type: connection.base.Schema.Types.ObjectId,
            ref: "RefreshToken",
            required: true
        }
    });

    return connection.model("ClientInstance", ClientInstanceSchema);
};