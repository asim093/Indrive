import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase/config";
import { useRouter } from "expo-router";
import Login_layout from "@/components/Login_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const storedRole = await AsyncStorage.getItem("Role");
      if (storedRole === "Admin") {
        router.push("/Admin/Main");
      } else if (storedRole === "User") {
        router.push("/UserPanel/Home");
      }
      setIsLoading(false);
    };
    checkRole();
  }, []);

const loginUser = async () => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful");
  } catch (error: any) {
    console.log(error.message);
  } finally {
    setLoading(false);
  }
};


  if (isLoading) {
    return (
      <SafeAreaProvider>
        <Login_layout>
          <ActivityIndicator size="large" color="#0000ff" />
        </Login_layout>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Login_layout>
        <Text style={{ textAlign: "center", fontSize: 20, margin: 20 }}>Login User</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Enter your Email"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
        <View style={{ margin: 10 }}>
          <Button title="Login" onPress={loginUser} />
        </View>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </Login_layout>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Login;
