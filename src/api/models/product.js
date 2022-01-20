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
            required: true,
        },
        price: {
            type: Number,
            require: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true },
    { collection: 'product' }
);

module.exports = mongoose.model('products', ProductSchema);
