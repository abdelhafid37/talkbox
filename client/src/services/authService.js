import api from "./api";

async function login(credentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}

async function register(userData) {
  const response = await api.post("/auth/register", userData);

  return response.data;
}

async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { login, register, getCurrentUser };
