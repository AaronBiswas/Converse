import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [AuthUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (inputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
        credentials: "include"
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Logout failed");
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle session expiry and other auth-related errors
  const handleAuthError = () => {
    localStorage.removeItem("chat-user");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ AuthUser, setAuthUser, login, signup, logout, handleAuthError, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
