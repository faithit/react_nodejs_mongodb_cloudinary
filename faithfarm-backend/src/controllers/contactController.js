// controllers/contactController.js
const Contact = require("../models/Contact");

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    const contact = await Contact.create({ name, email, phone, message });
    return res.status(201).json(contact);
  } catch (err) {
    console.error("CREATE CONTACT ERROR:", err);
    return res.status(500).json({ message: "Failed to create contact", error: err.message });
  }
};

// (Optional) Get all contact messages (protect this route in production)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (err) {
    console.error("GET CONTACTS ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
