function Products() {
  // ✅ For now, using static data (later replace with API data)
  const sampleProducts = [
    {
      id: 1,
      name: "Organic Dragon Fruit",
      price: 3.5,
      image: "/products/dragon.jpeg",
    },
    {
      id: 2,
      name: "Organic Mangoes",
      price: 2.0,
      image: "/products/mangoes.jpeg",
    },
    {
      id: 3,
      name: "Oranges",
      price: 5.0,
      image: "/products/oranges.jpeg",
    },
    {
      id: 4,
      name: "Dragon fruit",
      price: 1.8,
      image: "/products/dragonfruit.jpeg",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-8">Our Products</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* Product Info */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-green-700 font-bold mb-4">
                ${product.price.toFixed(2)}
              </p>

              {/* Button */}
              <button className="mt-auto bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
