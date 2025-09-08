import React from "react";

const ProductFilters = ({ filters, setFilters }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="font-semibold mb-2">Filters</h2>
      <label className="block mb-2">
        Category:
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="ml-2 border rounded p-1"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>
      </label>

      <label className="block">
        Price:
        <input
          type="number"
          placeholder="Min"
          className="ml-2 border rounded p-1 w-20"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max"
          className="ml-2 border rounded p-1 w-20"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </label>
    </div>
  );
};

export default ProductFilters;
