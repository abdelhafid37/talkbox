import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "@/services/authService";

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
