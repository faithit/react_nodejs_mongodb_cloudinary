const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);
module.exports = app;
