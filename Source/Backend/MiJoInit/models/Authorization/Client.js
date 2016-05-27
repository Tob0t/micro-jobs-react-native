module.exports = function (connection) {
    var ClientSchema = new connection.base.Schema({
        clientId: {
            type: String,
            unique: true,
            required: true
        },
        clientSecret: {
            type: String,
            unique: true,
            required: true
        }
    });

    return connection.model("Client", ClientSchema);
};