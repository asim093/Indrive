import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import Login from "../Auth/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase/config";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const handleLogout = async () => {
    console.log('working');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
    console.log(uid);

        // ...
      } else {
        console.log('logout');
        
        // User is signed out
        // ...
      }})
    
    // try {
    //   await AsyncStorage.removeItem("user_role");
    //   navigation.navigate("/Auth/Login");  // Ensure "Login" is the correct route name
    // } catch (error) {
    //   console.error("Failed to remove user role:", error);
    // }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>User Panel</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const UserPanelLayout = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Login" component={Login} />   */}
    </Drawer.Navigator>
  );
};

export default UserPanelLayout;
