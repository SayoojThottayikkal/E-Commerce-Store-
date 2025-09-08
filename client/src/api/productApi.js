import API from "./axios";

export const fetchProducts = () => API.get("/products");

export const fetchProduct = (id) => API.get(`/products/${id}`);

export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const bulkImportCSV = (formData) =>
  API.post("/products/bulk/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
