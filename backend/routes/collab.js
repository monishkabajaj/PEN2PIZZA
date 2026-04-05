const express = require("express");
const router = express.Router();
const Collab = require("../models/Collab");

// Create Project
router.post("/create", async (req, res) => {
    const collab = new Collab({
        ...req.body,
        members: [req.body.ownerId]
    });

    await collab.save();
    res.json({ message: "Project Created" });
});

// Get all projects
router.get("/", async (req, res) => {
    const data = await Collab.find();
    res.json(data);
});

module.exports = router;