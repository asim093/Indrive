import React from "react";
import { View, SafeAreaView, Text, StyleSheet, ImageBackground } from "react-native";
import AdminPanel from "../../components/Admin_Layout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import icons

const Admin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AdminPanel>
        <View style={styles.mainContent}>
          {/* Image Background */}
          <ImageBackground
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZM8cq7o8pziavfJSUIZkeTIMHxnoJcidQg&s"
            }}
            style={styles.headerBackground}
          >
            {/* Overlay to enhance text visibility */}
            <View style={styles.headerOverlay}>
              <Text style={styles.title}>Welcome, Admin!</Text>
              <Text style={styles.subtitle}>Manage your operations with ease</Text>
            </View>
          </ImageBackground>

          {/* Cards for Stats */}
          <View style={styles.cardsContainer}>
            {/* Card for Total Drivers */}
            <View style={styles.card}>
              <Icon name="car" size={40} color="#00d2ff" />
              <Text style={styles.cardTitle}>Total Drivers</Text>
              <Text style={styles.cardValue}>120</Text>
            </View>

            {/* Card for Total Rides */}
            <View style={styles.card}>
              <Icon name="map-marker-path" size={40} color="#00d2ff" />
              <Text style={styles.cardTitle}>Total Rides</Text>
              <Text style={styles.cardValue}>450</Text>
            </View>

            {/* Card for Total Earnings */}
            <View style={styles.card}>
              <Icon name="currency-usd" size={40} color="#00d2ff" />
              <Text style={styles.cardTitle}>Total Earnings</Text>
              <Text style={styles.cardValue}>$15,000</Text>
            </View>

            {/* Card for Total Users */}
            <View style={styles.card}>
              <Icon name="account-multiple" size={40} color="#00d2ff" />
              <Text style={styles.cardTitle}>Total Users</Text>
              <Text style={styles.cardValue}>850</Text>
            </View>
          </View>
        </View>
      </AdminPanel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerBackground: {
    width: "100%",
    height: 180, 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden", 
  },
  headerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.85,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
  },
  card: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
    marginBottom: 5,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a7bd5",
  },
});

export default Admin;
