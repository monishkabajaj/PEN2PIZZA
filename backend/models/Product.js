const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    userId: String,

    reviews: [
        {
            text: String
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);