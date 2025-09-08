import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  fetchProduct,
} from "../../api/productApi";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    tags: [],
    soldCount: 0,
    image: null,
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id).then((res) => {
        const product = {
          ...res.data,
          tags: res.data.tags || [],
          image: null,
        };
        setForm(product);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("soldCount", form.soldCount);
    data.append("tags", form.tags.join(","));

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      if (id) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Submit Product Error:", err);
      alert("Error saving product. Check console.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Sold Count"
          value={form.soldCount}
          onChange={(e) => setForm({ ...form, soldCount: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags.join(",")}
          onChange={(e) =>
            setForm({
              ...form,
              tags: e.target.value.split(",").map((t) => t.trim()),
            })
          }
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
