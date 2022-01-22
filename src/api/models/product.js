const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            max: 5,
            min: 0,
            default: 0,
        },
        categories: {
            type: [String],
            default: []
        },
        cloudinary_id: {
            type: String
        }
    },
    { timestamps: true },
    { collection: 'product' }
);

module.exports = mongoose.model('products', ProductSchema);
