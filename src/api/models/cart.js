const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                name: {
                    type: String
                },
                image: {
                    type: String
                },
                productId: String,
                price: Number,
                quantity: {
                    type: Number,
                    default: 1,
                }
            },
        ],
    },
    { timestamps: true },
    { collection: 'cart' }
);

module.exports = mongoose.model('carts', CartSchema);
