import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // 👈 import react-scroll
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          FaithFarm
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <ScrollLink
            to="home"
            smooth={true}
            duration={600}
            className="cursor-pointer hover:text-green-200"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            offset={-70}
            className="cursor-pointer hover:text-green-200"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-70}
            className="cursor-pointer hover:text-green-200"
          >
            Contact
          </ScrollLink>
          <Link to="/login" className="hover:text-green-200">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-green-800 px-4 py-3 space-y-2">
          <ScrollLink
            to="home"
            smooth={true}
            duration={600}
            className="block cursor-pointer hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            offset={-70}
            className="block cursor-pointer hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            About
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={600}
            offset={-70}
            className="block cursor-pointer hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Contact
          </ScrollLink>
          <Link to="/login" className="block hover:text-green-200" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
