const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const Collab = require("../models/Collab");

// Send Invite
router.post("/send", async (req, res) => {
    const invite = new Invite(req.body);
    await invite.save();
    res.json({ message: "Invite Sent" });
});

// Accept Invite
router.put("/accept/:id", async (req, res) => {
    const invite = await Invite.findById(req.params.id);

    invite.status = "accepted";
    await invite.save();

    await Collab.findByIdAndUpdate(invite.collabId, {
        $push: { members: invite.receiverId }
    });

    res.json({ message: "Joined Project" });
});

module.exports = router;