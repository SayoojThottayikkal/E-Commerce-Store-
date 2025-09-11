import React, { useState } from "react";

const ProductFilters = ({ filters, setFilters }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApply = () => {
    setFilters(tempFilters);
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="font-semibold mb-2">Filters</h2>

      <label className="block mb-2">
        Category:
        <select
          value={tempFilters.category}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, category: e.target.value })
          }
          className="ml-2 border rounded p-1"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>
      </label>

      <label className="block mb-2">
        Price:
        <input
          type="number"
          placeholder="Min"
          value={tempFilters.minPrice || ""}
          className="ml-2 border rounded p-1 w-20"
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minPrice: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max"
          value={tempFilters.maxPrice || ""}
          className="ml-2 border rounded p-1 w-20"
          onChange={(e) =>
            setTempFilters({ ...tempFilters, maxPrice: e.target.value })
          }
        />
      </label>

      <button
        onClick={handleApply}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default ProductFilters;
