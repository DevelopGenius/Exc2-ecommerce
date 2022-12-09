const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    orderProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, amount: {
            type: Number,
            require: true,
            min: 1
        }
    }],
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;