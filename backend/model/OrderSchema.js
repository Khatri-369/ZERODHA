const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
});

const OrderModel = new mongoose.model("order", orderSchema);

module.exports = OrderModel;