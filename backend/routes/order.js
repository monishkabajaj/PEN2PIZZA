const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/create", async (req, res) => {

    const order = new Order({
        buyerId: req.body.buyerId,
        sellerId: req.body.sellerId,
        productId: req.body.productId,
        paymentId: req.body.paymentId
    });

    await order.save();

    res.json({ message: "Order Placed" });
});


// 🔥 GET SELLER ORDERS
router.get("/seller/:id", async (req, res) => {

    const orders = await Order.find({ sellerId: req.params.id });

    res.json(orders);
});


// 🔥 ACCEPT ORDER
router.post("/accept/:id", async (req, res) => {

    await Order.findByIdAndUpdate(req.params.id, {
        status: "Accepted"
    });

    res.json({ message: "Order Accepted" });
});


// 🔥 REJECT ORDER
router.post("/reject/:id", async (req, res) => {

    await Order.findByIdAndUpdate(req.params.id, {
        status: "Rejected"
    });

    res.json({ message: "Order Rejected" });
});

module.exports = router;