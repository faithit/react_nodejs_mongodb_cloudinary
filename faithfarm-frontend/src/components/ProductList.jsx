function ProductList({ products }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
        <div key={p._id || p.id} className="border rounded-lg p-4 shadow">
        <img
        src={p.imageUrl || "https://via.placeholder.com/150"}
        alt={p.name}
        className="h-32 w-full object-cover rounded"
         />
    <h3 className="font-bold mt-2">{p.name}</h3>
    <p className="text-gray-600">ksh{p.price}</p>
    <p className="text-sm text-gray-500">{p.description}</p>
  </div>
))}

      </div>
    </div>
  );
}

export default ProductList;
