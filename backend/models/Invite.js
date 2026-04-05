const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
    collabId: String,
    senderId: String,
    receiverId: String,
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Invite", inviteSchema);