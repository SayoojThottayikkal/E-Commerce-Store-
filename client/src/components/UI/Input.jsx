import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="mb-3">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <input
        {...props}
        className="w-full border px-3 py-2 rounded focus:outline-blue-600"
      />
    </div>
  );
};

export default Input;
