// // AuthContext.tsx

// import React, { createContext, useState, useEffect, ReactNode } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

// // Define the structure of the AuthContext
// type AuthContextType = {
//   userRole: string | null;
//   setUserRole: (role: string) => void;
// };

// export const AuthContext = createContext<AuthContextType>({
//   userRole: null,
//   setUserRole: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const checkUserRole = async () => {
//       const storedRole = await AsyncStorage.getItem("userRole");
//       if (storedRole) {
//         setUserRole(storedRole);
//       }
//     };

//     checkUserRole();
//   }, []);

//   useEffect(() => {
//     if (userRole === "admin") {
//       router.push("/Admin/Main");
//     } else if (userRole === "user") {
//       router.push("/UserPanel/Home");
//     }
//   }, [userRole, router]);

//   return (
//     <AuthContext.Provider value={{ userRole, setUserRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
