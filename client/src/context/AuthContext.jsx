import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("token");
    if (userLocal) {
      const parsedUserData = JSON.parse(userLocal);
      setUser(parsedUserData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser((prev) => {
      return null;
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
