const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_KEY_SECRET"
});

// CREATE ORDER
router.post("/create-order", async (req, res) => {

    const { amount } = req.body;

    const options = {
        amount: amount * 100, // ₹ → paise
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Payment failed" });
    }
});

module.exports = router;