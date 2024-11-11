// // Authentication_context.tsx
// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface AuthContextType {
//   role: string | null;
//   isAuthenticated: boolean;
//   login: (role: string) => void; // Add login function here
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [role, setRole] = useState<string | null>(null);
//   const isAuthenticated = !!role;

//   useEffect(() => {
//     const loadRole = async () => {
//       const storedRole = await AsyncStorage.getItem("userRole");
//       if (storedRole) {
//         setRole(storedRole);
//       }
//     };
//     loadRole();
//   }, []);

//   const login = async (role: string) => {
//     setRole(role);
//     await AsyncStorage.setItem("userRole", role);
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("userRole");
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ role, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
