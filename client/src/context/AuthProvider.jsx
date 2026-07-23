import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "@/services/authService";
import socket from "@/services/socket";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));

  function setToken(token) {
    setTokenState(token);
    localStorage.setItem("token", token);
  }

  function logout() {
    localStorage.removeItem("token");
    setTokenState(null);
    setUser(null);
  }

  useEffect(() => {
    if (!token) return;

    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!token) {
      socket.disconnect();
      return;
    }

    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);

      socket.emit("join", {
        userId: user._id,
        username: user.username,
      });
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("userJoined", (data) => {
      console.log(`${data.username} joined the chat`);
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
      socket.off("userJoined");
    };
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
