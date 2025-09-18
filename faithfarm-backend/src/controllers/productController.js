const Product = require("../models/Product");
const { cloudinary } = require("../config/cloudinary");

// ---------- CREATE PRODUCT ----------
exports.createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, description, category } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const productData = {
      name,
      price: Number(price),
      description,
      category,
    };

    if (req.file) {
      productData.imageUrl = req.file.path;
      productData.imagePublicId = req.file.filename || req.file.public_id;
    }

    const product = await Product.create(productData);
    console.log("PRODUCT CREATED:", product);
    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

// ---------- GET ALL PRODUCTS ----------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ---------- GET SINGLE PRODUCT ----------
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// ---------- UPDATE PRODUCT ----------
exports.updateProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, description, category } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update image if a new file is uploaded
    if (req.file) {
      if (product.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(product.imagePublicId, { resource_type: "image" });
        } catch (delErr) {
          console.warn("Failed to delete old Cloudinary image:", delErr.message);
        }
      }
      product.imageUrl = req.file.path;
      product.imagePublicId = req.file.filename || req.file.public_id;
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;

    await product.save();
    console.log("PRODUCT UPDATED:", product);
    res.json(product);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// ---------- DELETE PRODUCT ----------
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId, { resource_type: "image" });
      } catch (err) {
        console.warn("Failed to delete Cloudinary image:", err.message);
      }
    }

    await product.deleteOne();
    console.log("PRODUCT DELETED:", product._id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
