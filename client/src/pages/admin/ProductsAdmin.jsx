import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../api/productApi";
import { Link } from "react-router-dom";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(Array.isArray(res.data.items) ? res.data.items : []);
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete product error:", err);
      alert("Failed to delete product. Check console.");
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Link
          to="/admin/products/new"
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li
              key={p._id}
              className="flex justify-between items-center border p-2 mb-2"
            >
              <div className="flex items-center gap-4">
                {p.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${p.image}`}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <strong>{p.title}</strong> - ₹{p.price} <br />
                  <small>
                    Stock: {p.stock} | Category: {p.category}
                  </small>
                </div>
              </div>
              <div>
                <Link
                  to={`/admin/products/${p._id}`}
                  className="mr-3 text-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsAdmin;
