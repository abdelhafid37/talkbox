import api from "./api";

async function login(credentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}

async function register(userData) {
  const response = await api.post("/auth/register", userData);

  return response.data;
}

export { login, register };
