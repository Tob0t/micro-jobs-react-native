module.exports = function(connection){
    var ObjectId = connection.base.Schema.Types.ObjectId;
    var UserSchema = connection.base.Schema({
        skips: {
            type: [ObjectId],
        },
        offers: {
            type: [ObjectId],
        },
        requests: {
            type: [ObjectId],
        }
    });
    return connection.model('User', UserSchema);
}