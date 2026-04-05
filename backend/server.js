const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/pen2pizza")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/collab", require("./routes/collab"));
app.use("/api/invite", require("./routes/invite"));
app.use("/uploads", express.static("uploads"));
app.use("/api/chat", require("./routes/chat"));

const PORT = process.env.PORT || 5000;  // Render ke liye dynamic port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
