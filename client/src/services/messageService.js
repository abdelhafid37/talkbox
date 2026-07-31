import api from "./api";

async function getConversation(userId) {
  const token = localStorage.getItem("token");
  const response = await api.get(`/messages/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { getConversation };
