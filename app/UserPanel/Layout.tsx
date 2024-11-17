import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import Login from "../Auth/Login";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase/config";
import { useRouter } from "expo-router";
import BookRideScreen from "./Bookride";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("Role");
      Alert.alert("Logout Successful", "You have been logged out.");
      router.push("/Auth/Login");
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      Alert.alert("Logout Error", "Something went wrong, please try again.");
    }
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
      <Drawer.Screen name="Bookride" component={BookRideScreen} />
    
    </Drawer.Navigator>
  );
};

export default UserPanelLayout;
