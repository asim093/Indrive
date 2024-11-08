import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase/config";
import { Link, useRouter } from "expo-router";
import Login_layout from "@/components/Login_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, isLoading] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkRoleFromStorage = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      if (storedRole) {
        setUserRole(storedRole);
      }
    };

    checkRoleFromStorage();
  }, []);

  useEffect(() => {
    if (userRole) {
      if (userRole === "admin") {
        alert("Admin Login Successfully");

        window.location.reload();
        router.push("/Admin/Main");
      } else {
        alert("User Login Successfully");

        window.location.reload();
        router.push("/UserPanel/Home");
      }
    }
  }, [userRole]);

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const role = user.email === "admin@gmail.com" ? "admin" : "user";
      await AsyncStorage.setItem("userRole", role);

      setUserRole(role); // This will trigger the useEffect for navigation
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaProvider>
      {}
      <Login_layout>
        <Text style={{ textAlign: "center", fontSize: 20, margin: 20 }}>
          Login User
        </Text>
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
          secureTextEntry={true}
        />
        <View style={{ margin: 10 }}>
          <Button title="Login" onPress={loginUser} />
        </View>

        <View style={styles.linkContainer}>
          <Text>Not a User? </Text>
          <Link href={"/Auth/Signup"} style={styles.link}>
            SignUp
          </Link>
        </View>
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
    shadowColor: "#c0f11c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 0,
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Login;
