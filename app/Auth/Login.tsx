import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase/config"; 
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/components/Authentication_context"; 
import Login_layout from "@/components/Login_layout";

const Login = () => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth(); 

  const registerUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser({
        id: user.uid,
        email: user.email,
        role: user.email === "admin@gmail.com" ? "admin" : "user",  
      });

      if (user.email === "admin@gmail.com") {  
        alert("Admin Login Successfully");
        router.push("/Admin/Main");
      } else {
        alert("User Login Successfully");
        router.push("/UserPanel/Home");  
      }
    } catch (error: any) {
      alert(error.message); 
    }
  };

  return (
    <SafeAreaProvider>
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
          <Button title="Login" onPress={registerUser} />
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
