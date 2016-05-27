module.exports = function (connection) {
    var RefreshTokenSchema = new connection.base.Schema({
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
    return connection.model("RefreshToken", RefreshTokenSchema);
}
