import React, { useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import AdminPanel from "../../components/Admin_Layout";
// import { useAuth } from "@/components/Authentication_context";
import { useNavigation } from "expo-router";

const Admin = () => {
  // const { user, isAdmin } = useAuth(); 
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (!user || !isAdmin) {
  //     navigation.navigate("/Auth/Login"); 
  //   }
  // }, [user, isAdmin]);

  return (
    <SafeAreaView style={styles.container}>
      <AdminPanel>
        <View style={styles.content}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZM8cq7o8pziavfJSUIZkeTIMHxnoJcidQg&s",
            }}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>WELCOME TO INDRIVE ADMIN PANEL</Text>
          <Text style={styles.tagline}>
            Manage your drivers and operations efficiently
          </Text>
        </View>
      </AdminPanel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Android shadow
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#666", // Lighter text for the tagline
    textAlign: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60, // Circle image
    borderWidth: 2,
    borderColor: "#ccc",
  },
});

export default Admin;
