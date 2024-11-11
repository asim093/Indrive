import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View>
      <View>
        
      </View>
      <View
        style={{
          width: "100%",
          zIndex: 0,
          backgroundColor: "#4F46E5",
          padding: 16,
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Search..."
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 10,
            width: "70%",
            marginLeft:"20%",
            height: 40,
          }}
        />
        <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
          <FontAwesome name="bell" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

export default Navbar;
