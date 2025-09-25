import { useState } from "react";
import axios from "axios";

function ProductList({ products, onDelete, onUpdate }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  // Open modal with selected product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
  };

  // Save update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editingProduct.imageUrl;

      // ✅ Upload to Cloudinary if new image selected
      if (form.image) {
        const data = new FormData();
        data.append("file", form.image);
        data.append("upload_preset", "faithfarm_products"); // replace
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dx5oluh2i/image/upload",
          data
        );
        imageUrl = uploadRes.data.secure_url;
      }

      const updatedData = {
        name: form.name,
        price: form.price,
        description: form.description,
        imageUrl,
      };

      await onUpdate(editingProduct._id, updatedData);
      setEditingProduct(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      {/* Grid of products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={p.imageUrl || "https://via.placeholder.com/150"}
              alt={p.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-green-700 font-medium">Ksh {p.price}</p>
            <p className="text-gray-600 text-sm mb-3">{p.description}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="w-full"
              />

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
