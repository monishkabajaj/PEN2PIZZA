const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyerId: String,
    sellerId: String,
    productId: String,
    paymentId: String,

    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Order", orderSchema);