const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
    title: String,
    description: String,
    ownerId: String,
    members: [String], // user IDs
    status: {
        type: String,
        default: "open"
    }
});

module.exports = mongoose.model("Collab", collabSchema);