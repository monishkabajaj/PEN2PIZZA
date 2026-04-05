const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
app.use("/api/payment", require("./routes/payment"));
app.use("/api/freelancer", require("./routes/freelancer"));
app.use("/api/chat", require("./routes/chat"));

// Add Service
router.post("/add", async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.json({ message: "Service Added" });
});

// Get All Services
router.get("/", async (req, res) => {
    const data = await Service.find();
    res.json(data);
});

module.exports = router;