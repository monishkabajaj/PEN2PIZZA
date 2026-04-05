const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
    userId: String,
    name: String,
    skills: String,
    price: Number,
    bio: String,
    contact: String
});

module.exports = mongoose.model("Freelancer", freelancerSchema);