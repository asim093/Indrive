import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useAuth } from "@/components/Authentication_context";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("/Auth/Login"); 
    }
  }, [user]);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
  );
};

export default Home;
