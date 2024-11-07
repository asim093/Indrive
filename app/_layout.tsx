import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "@/components/Authentication_context";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Adddriver from "./Admin/Adddriver";
import Editdriver from "./Admin/Editdriver";
import Showdriver from "./Admin/Showdriver";
import Admin from "./Admin/Main";
import Home from "./UserPanel/Home";

const Stack = createStackNavigator();

const RootLayout = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Auth/Login" component={Login} />
          <Stack.Screen name="Auth/Signup" component={Signup} />
        </>
      ) : (
        <>
          {user.role === "admin" ? (
            <>
              <Stack.Screen name="Admin/Main" component={Admin} />
              <Stack.Screen name="Admin/Adddriver" component={Adddriver} />
              <Stack.Screen name="Admin/Editdriver" component={Editdriver} />
              <Stack.Screen name="Admin/Showdriver" component={Showdriver} />
            </>
          ) : (
            <Stack.Screen name="UserPanel/Home" component={Home} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootLayout;
