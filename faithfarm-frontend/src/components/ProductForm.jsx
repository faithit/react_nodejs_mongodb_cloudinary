import { useState } from "react";
import axios from "axios";

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onProductAdded(res.data);
      setForm({ name: "", price: "", description: "" });
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-8 rounded-xl max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">➕ Add New Product</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Price (Ksh)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="3"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-100 file:text-green-700
                     hover:file:bg-green-200"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-32 w-auto mt-3 rounded-lg border shadow-sm"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        💾 Save Product
      </button>
    </form>
  );
}

export default ProductForm;
