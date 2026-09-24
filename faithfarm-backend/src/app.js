const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

// CORS configuration for production and development
const allowedOrigins = [
  "https://your-vercel-url.vercel.app", // Production (replace with your actual Vercel URL)
  "http://localhost:3000",  // Local development (if using port 3000)
  "http://localhost:5173",  // Vite default development port
];

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);
module.exports = app;
