// src/components/Contact.jsx
import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // basic client validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }

    setLoading(true);
    try {
      // adjust base URL if needed: e.g. "http://localhost:5000/api/contacts"
      const res = await axios.post("http://localhost:5000/api/contacts", form);
      setSuccess("Thanks — your message has been sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("contact submit error", err);
      setError(err.response?.data?.message || "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Contact Info */}
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-6">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Have questions or want to work with us? We’d love to hear from you.
            Reach out through the form or contact us directly.
          </p>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-gray-700">📍 <span>123 Green Lane, Nairobi, Kenya</span></p>
            <p className="flex items-center gap-3 text-gray-700">📞 <span>+254 700 123 456</span></p>
            <p className="flex items-center gap-3 text-gray-700">✉️ <span>info@faithfarm.com</span></p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          {success && <div className="mb-4 p-3 text-green-800 bg-green-100 rounded">{success}</div>}
          {error && <div className="mb-4 p-3 text-red-800 bg-red-100 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone (optional)"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-green-400" : "bg-green-700 hover:bg-green-800"} text-white py-3 rounded-lg font-semibold transition`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
