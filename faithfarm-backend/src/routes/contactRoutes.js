const express = require("express");
const Contact = require("../models/Contact");
const {
  createContact,
  getContacts,
} = require("../controllers/contactController");

const router = express.Router();

// Create a message
router.post("/", createContact);

// Get all messages (in production, protect this route)
// router.get("/", auth("admin"), getContacts);
router.get("/", getContacts);

// Delete message
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// Toggle read/unread
router.patch("/:id", async (req, res) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    msg.read = !msg.read; // toggle read/unread
    await msg.save();

    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" });
  }
});


module.exports = router;
