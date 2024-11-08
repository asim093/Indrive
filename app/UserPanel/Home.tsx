import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Open drawer
      />
    </View>
  );
};

export default Home;
