import React, { createContext, useContext, ReactNode, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
