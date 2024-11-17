import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "../components/Authentication_context";
import Login from "./Auth/Login";
import UserPanelLayout from "./UserPanel/Layout";
import AddDriver from "./Admin/Adddriver";
import Showdriver from "./Admin/Showdriver";
import Admin from "./Admin/Main";
import DriverDetails from "./Admin/Driverdetails";
import Editdriver from "./Admin/Editdriver";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, loading } = context;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
      <AuthProvider>
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : user.role === "Admin" ? (
        <>
          <Stack.Screen
            name="Admin/Main"
            component={Admin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin/Adddriver"
            component={AddDriver}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin/Showdriver"
            component={Showdriver}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin/Driverdetails"
            component={DriverDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin/Editdriver"
            component={Editdriver}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="UserPanel/Home"
          component={UserPanelLayout}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
      </AuthProvider>
  );
};

export default AppNavigator;
