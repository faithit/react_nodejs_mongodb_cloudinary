import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

// ✅ Icons
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  Settings,
  Search,
  LogOut,
  Menu,
} from "lucide-react";
import MessagesList from "../components/admin/MessagesList.jsx";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  // ✅ Load products only when needed
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        updatedData
      );
      setProducts(products.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-green-900 text-white p-6 flex flex-col transition-all duration-300`}
      >
        <h2
          className={`text-2xl font-bold mb-10 text-center ${
            collapsed ? "hidden" : "block"
          }`}
        >
          FaithFarm
        </h2>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-800 transition"
          >
            <LayoutDashboard size={20} />
            {!collapsed && "Dashboard"}
          </Link>

          <Link
            to="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-800 transition"
          >
            <Package size={20} />
            {!collapsed && "Products"}
          </Link>
        <Link
          to="/dashboard/messages"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-800 transition"
        >
          <MessageSquare size={20} />
          {!collapsed && "Messages"}
        </Link>
          <Link
            to="/dashboard/users"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-800 transition"
          >
            <Users size={20} />
            {!collapsed && "Users"}
          </Link>

          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-800 transition"
          >
            <Settings size={20} />
            {!collapsed && "Settings"}
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* ✅ Top Navbar */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 bg-green-100 rounded hover:bg-green-200"
            >
              <Menu size={20} className="text-green-800" />
            </button>
            <h1 className="text-2xl font-bold text-green-700">Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-green-600 w-9 h-9 flex items-center justify-center rounded-full text-white font-bold">
                F
              </div>
              <span className="font-medium text-gray-700">Admin</span>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* ✅ Content Area */}
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Welcome to Dashboard
                  </h2>
                  <p className="text-gray-600">Overview of your app here...</p>
                </div>
              }
            />

            <Route
              path="products"
              element={
                <>
                  <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Add New Product
                    </h2>
                    <ProductForm onProductAdded={handleProductAdded} />
                  </div>

                  <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Product List</h2>
                    <ProductList
                      products={products}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  </div>
                </>
              }
            />

            <Route
              path="users"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">User Management</h2>
                  <p className="text-gray-600">Manage users will go here...</p>
                </div>
              }
            />

            <Route
              path="settings"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  <p className="text-gray-600">App settings will go here...</p>
                </div>
              }
            />
            <Route path="messages"
           element={<MessagesList />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
