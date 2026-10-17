const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    avg: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    net: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    isLoss: {
        type: Boolean,
        default: false
    }
});

const HoldingModel = new mongoose.model("holding", holdingSchema);

module.exports = HoldingModel;