import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ state, navigation, descriptors }: DrawerContentComponentProps) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userRole");
      navigation.navigate("Auth/Login");
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to remove user role:", error);
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
    </Drawer.Navigator>
  );
};

export default UserPanelLayout;
