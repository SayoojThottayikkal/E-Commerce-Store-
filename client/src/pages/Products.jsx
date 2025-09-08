import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (!items || items.length === 0)
    return <p className="p-4">No products found.</p>;

  return (
    <div className="flex">
      <aside className="w-1/4 p-4">
        <ProductFilters filters={{}} setFilters={() => {}} />
      </aside>
      <main className="w-3/4 grid grid-cols-3 gap-4 p-4">
        {Array.isArray(items) &&
          items.map((p) => <ProductCard key={p._id} product={p} />)}
      </main>
    </div>
  );
};

export default Products;
