import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Login_layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Swiper style={styles.wrapper} showsPagination={false}>
          <View style={styles.slide}>
            {/* <Image
              source={require("./assets/images/login_images_1.png")}
              style={{ width: 100, height: 100 }}
            /> */}
            <View style={styles.textContainer}>
              <Text style={styles.slideText}>App Where You Set The Price</Text>
              <Text style={styles.slideDescription}>
                Find The Best Offers from drivers, Passengers, and more
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            {/* <Image
              source={require("./assets/images/login_images.png")}
              style={{ width: 100, height: 100 }}
            /> */}
            <View style={styles.textContainer}>
              <Text style={styles.slideText}>Your Safety is our Priority</Text>
              <Text style={styles.slideDescription}>
                Only Verified Service Products Choose Yours by rating and other
                info
              </Text>
            </View>
          </View>
        </Swiper>

        {/* Add some margin to the top for spacing */}
        <View style={styles.childrenContainer}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  wrapper: {
    height: 400,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  image: {
    width: "80%", // Adjust the width as needed
    height: 300, // Adjust image height as needed
    objectFit: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  slideText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  slideDescription: {
    textAlign: "center",
    marginTop: 5,
  },
  childrenContainer: {
    paddingTop: 0,
  },
});

export default Login_layout;
