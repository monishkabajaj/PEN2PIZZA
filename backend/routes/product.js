const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");

// ✅ FIRST multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });


// ✅ ADD PRODUCT (image upload)
router.post("/add", upload.single("image"), async (req, res) => {

    const { title, price, description } = req.body;

    const newProduct = new Product({
        title,
        price,
        description,
        image: req.file ? `/uploads/${req.file.filename}` : "",
        userId: "123",
        reviews: []
    });

    await newProduct.save();

    res.json({ message: "Product Added" });
});


// ✅ GET PRODUCTS
router.get("/", async (req, res) => {

    const products = await Product.find();
    res.json(products);
});


// ✅ ADD REVIEW
router.post("/review/:id", async (req, res) => {

    const { text } = req.body;

    const product = await Product.findById(req.params.id);

    product.reviews.push({ text });

    await product.save();

    res.json({ message: "Review added" });
});


module.exports = router;