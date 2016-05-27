module.exports = function(connection){
    var InterestSchema = connection.base.Schema({
        offer: {
            type: ObjectId,
            required: true,
        },
        offerer: {
            type: ObjectId,
            required: true,
        },
        taker: {
            type: ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: [
                'ACCEPTED',
                'DECLINED',
                'NONE',
            ],
            default: 'NONE'
        },
        modified: {
            type: Date,
            default: Date.now
        }
    });
    return connection.model('Interest', InterestSchema);
}