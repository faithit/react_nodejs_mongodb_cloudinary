import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about"className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="/products/dragon.jpeg"
              alt="Faith Farm fields"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-green-700 mb-6">
              About Faith Farm
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At <span className="font-semibold">Faith Farm</span>, we are
              committed to providing high-quality, organic, and sustainable
              produce. Our farm-to-table approach ensures freshness, promotes
              healthy living, and supports local communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe in sustainable farming practices that protect the
              environment and deliver the best produce directly from our fields
              to your home. 🌱
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
