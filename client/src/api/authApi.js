import api from "./axios";

export const loginApi = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const registerApi = async (userInfo) => {
  const { data } = await api.post("/auth/register", userInfo);
  return data;
};

export const meApi = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
