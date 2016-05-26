module.exports = function(connection){
    var ObjectId = connection.base.Schema.Types.ObjectId;

    var Payment = new connection.base.Schema({
        type: {
            type: String,
            enum: ['MONEY', 'SERVICE']
        },
        value : {
            type: String,
        }
    });

    var OfferSchema = connection.base.Schema({
        user: {
            type: ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        location: {
            type: [Number],
            required: true,
            index: '2dsphere'
        },
        payment: {
            type: Payment,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        }
    });
    
    return connection.model('Offer', OfferSchema);
}