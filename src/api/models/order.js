const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                },
            },
        ],
        status: {
            type: String,
            default: 'Success',
        },
    },
    { timestamps: true },
    { collection: 'order' }
);

module.exports = mongoose.model('orders', OrderSchema);
