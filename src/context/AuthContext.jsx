import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

const login = (phone) => {
  if (phone.startsWith("+254")) {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
};

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
