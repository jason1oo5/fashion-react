const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        id: { type: Number, required: true },
        salt: { type: String, default: 'Empty' },
        type: { type: Number, required: true },
        entity_id: { type: Number, required: true },
        userid: { type: Number, required: true },
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        state: { type: Number, default: 0 },
        payment_method: { type: String, default: null },
        provider_tx : {type: String, default: null},
        cancel_reason: { type:  String, default: null },
        period: { type: Number, default: 0 },    
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "udpated_at" }
    }
)

const Order = mongoose.model('Order', OrderSchema);

Order.getAcceptedOrders = async function (user_id) {
    const [orders] = await Promise.all([
        this.aggregate([
            {
                $match: { state: { $in: [1, 3] }, userid: user_id }
            }
        ])
    ])

    return orders;
}

module.exports = Order;