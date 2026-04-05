const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    serviceId: String,
    buyerId: String,
    sellerId: String,
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Request", requestSchema);