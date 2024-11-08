import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/config/firebase/config";

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-200)).current;
  const router = useRouter();

  const toggleSidebar = () => {
    if (isOpen) {
      Animated.timing(sidebarAnimation, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsOpen(!isOpen);
    onToggle();
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("userRole");
      await signOut(auth);
      alert("Admin logged out successfully");
      window.location.reload();
    } catch (error: any) {
      console.log("Logout Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
        {isOpen ? (
          <Entypo name="cross" size={30} color="white" />
        ) : (
          <Entypo name="menu" size={30} color="white" />
        )}
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnimation }], zIndex: 1 },
        ]}
      >
        <Text style={styles.headerText}>Admin Panel</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/Admin/Main")}
        >
          <FontAwesome name="dashboard" size={24} color="white" />
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/Admin/Adddriver")}
        >
          <Feather name="users" size={24} color="white" />
          <Text style={styles.menuText}>Add Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/Admin/Showdriver")}
        >
          <MaterialIcons name="analytics" size={24} color="white" />
          <Text style={styles.menuText}>Driver List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="cogs" size={24} color="white" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity style={styles.menuItem} onPress={logoutHandler}>
          <Feather name="log-out" size={24} color="white" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  toggleButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 2,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 200,
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Sidebar;
