const express = require("express");
const router = express.Router();

let chats = []; // temporary store

// SEND MESSAGE
router.post("/send", (req, res) => {

    const { senderId, receiverId, text } = req.body;

    if(!senderId || !receiverId || !text){
        return res.status(400).json({ error: "Missing data" });
    }

    chats.push({ senderId, receiverId, text });

    res.json({ message: "Message sent" });
});

// GET CHAT
router.get("/:senderId/:receiverId", (req, res) => {

    const { senderId, receiverId } = req.params;

    const filtered = chats.filter(c =>
        (c.senderId == senderId && c.receiverId == receiverId) ||
        (c.senderId == receiverId && c.receiverId == senderId)
    );

    res.json(filtered);
});

module.exports = router;