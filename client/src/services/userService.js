import api from "./api";

async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

async function getUsers() {
  const token = localStorage.getItem("token");

  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { getCurrentUser, getUsers };
