import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Auth/Login";
import UserPanelLayout from "./UserPanel/Layout";
import AddDriver from "./Admin/Adddriver";
import Showdriver from "./Admin/Showdriver";
import Admin from "./Admin/Main";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedRole = await AsyncStorage.getItem("user_role");
      if (storedRole) {
        setRole(storedRole);
      }
    };
    checkAuth();
  }, []);

  return (
      <Stack.Navigator >
        {!role ? (
          <Stack.Screen name="Auth/Login" component={Login}  options={{ headerShown: false }}  />
        ) : role === "admin" ? (
          <>
            <Stack.Screen name="Admin/Main" component={Admin}  options={{ headerShown: false }}  />
            <Stack.Screen name="Admin/Adddriver" component={AddDriver}  options={{ headerShown: false }}  />
            <Stack.Screen name="Admin/Showdriver" component={Showdriver}  options={{ headerShown: false }}  />
          </>
        ) : (
          <Stack.Screen name="UserPanel/Layout" component={UserPanelLayout}  options={{ headerShown: false }}  />
        )}
      </Stack.Navigator>
  );
};

export default AppNavigator;
