const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 1
    },
    description: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;