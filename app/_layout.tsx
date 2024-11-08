import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Adddriver from "./Admin/Adddriver";
import Editdriver from "./Admin/Editdriver";
import Showdriver from "./Admin/Showdriver";
import Admin from "./Admin/Main";
import UserPanelLayout from "./UserPanel/Layout"; // Import the UserPanelLayout with Drawer
import DriverDetails from "./Admin/Driverdetails";

const Stack = createStackNavigator();

const MainLayout = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state while checking AsyncStorage

  useEffect(() => {
    const checkRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        setRole(storedRole); // Set role if found in AsyncStorage
      } catch (error) {
        console.error("Failed to fetch role from AsyncStorage:", error);
      } finally {
        setIsLoading(false); // Set loading state to false once role is fetched
      }
    };
    checkRole();
  }, []);

  if (isLoading) {
    return null; // Optionally show a loading spinner while checking the role
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Show login if no role exists */}
      {!role ? (
        <>
          <Stack.Screen name="Auth/Login" component={Login} />
          <Stack.Screen name="Auth/Signup" component={Signup} />
        </>
      ) : (
        <>
          {role === "admin" ? (
            <>
              <Stack.Screen name="Admin/Main" component={Admin} />
              <Stack.Screen name="Admin/Adddriver" component={Adddriver} />
              <Stack.Screen name="Admin/Editdriver" component={Editdriver} />
              <Stack.Screen name="Admin/Showdriver" component={Showdriver} />
              <Stack.Screen name="Admin/Driverdetails" component={DriverDetails} />
            </>
          ) : (
            <Stack.Screen
              name="UserPanel/Home" // Correct the name to "UserPanel/Home"
              component={UserPanelLayout} // Use the UserPanelLayout here
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainLayout;
