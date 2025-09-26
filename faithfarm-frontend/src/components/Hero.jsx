import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606788075761-86a06237804d?auto=format&fit=crop&w=1600&q=80')", // Replace with your own farm product image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Fresh Farm Products Delivered to You
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Organic • Healthy • Sustainable
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
