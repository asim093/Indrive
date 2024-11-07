import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: any;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isAdmin: boolean; // Add isAdmin here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  // Add isAdmin based on the user's role
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
