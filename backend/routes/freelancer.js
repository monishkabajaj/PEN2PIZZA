const express = require("express");
const router = express.Router();
const Freelancer = require("../models/Freelancer");

// CREATE PROFILE
router.post("/create", async (req, res) => {

    const freelancer = new Freelancer(req.body);
    await freelancer.save();

    res.json({ message: "Profile Created" });
});

// GET ALL
router.get("/", async (req, res) => {

    const data = await Freelancer.find();
    res.json(data);
});

// GET MY PROFILE
router.get("/me/:id", async (req, res) => {

    const data = await Freelancer.findOne({ userId: req.params.id });
    res.json(data);
});

module.exports = router;