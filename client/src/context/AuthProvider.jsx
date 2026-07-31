import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import socket from "@/services/socket";
import { getCurrentUser } from "@/services/userService";

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

    socket.auth = {
      token,
    };

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);

      socket.emit("join");
    });

    return () => socket.off("connect");
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
