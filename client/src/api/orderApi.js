import api from "./axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const placeOrderApi = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

export const myOrdersApi = async () => {
  const { data } = await api.get("/orders/mine", {
    headers: {
      ...getAuthHeaders(),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return data;
};

export const allOrders = async () => {
  const { data } = await api.get("/orders", {
    headers: {
      ...getAuthHeaders(),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(
    `/orders/${id}`,
    { status },
    { headers: getAuthHeaders() }
  );
  return data;
};

export const adminStats = async () => {
  const { data } = await api.get("/orders/stats/summary", {
    headers: getAuthHeaders(),
  });
  return data;
};
