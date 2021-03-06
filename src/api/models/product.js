const mongoose = require("mongoose");
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
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    rating: {
      type: Number,
      max: 5,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true },
  { collection: "product" }
);

module.exports = mongoose.model("products", ProductSchema);
