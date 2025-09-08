import api from "./axios";

export const placeOrderApi = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const myOrdersApi = async () => {
  const { data } = await api.get("/orders/mine");
  return data;
};

export const allOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}`, { status });
  return data;
};

export const adminStats = async () => {
  const { data } = await api.get("/orders/stats/summary");
  return data;
};
