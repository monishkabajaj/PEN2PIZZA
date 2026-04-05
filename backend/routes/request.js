const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// Send Request
router.post("/send", async (req, res) => {
    const reqData = new Request(req.body);
    await reqData.save();
    res.json({ message: "Request Sent" });
});

// Get Requests
router.get("/:userId", async (req, res) => {
    const data = await Request.find({ sellerId: req.params.userId });
    res.json(data);
});

// Accept / Reject
router.put("/:id", async (req, res) => {
    await Request.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.json({ message: "Updated" });
});

module.exports = router;