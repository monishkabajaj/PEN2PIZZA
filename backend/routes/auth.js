const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secret123";


// ================= SIGNUP (AFTER OTP VERIFY FRONTEND) =================
router.post("/verify-otp", async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        res.json({ message: "Signup Successful ✅" });

    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id }, SECRET);

        res.json({ token, user });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;