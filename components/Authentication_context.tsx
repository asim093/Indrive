import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../config/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  uid: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.data();

        if (userData?.role) {
          const loggedInUser = { uid: currentUser.uid, email: currentUser.email, role: userData.role };
          setUser(loggedInUser);

          // Save role to AsyncStorage
          await AsyncStorage.setItem('Role', userData.role);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('Role');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    await AsyncStorage.removeItem('Role');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
