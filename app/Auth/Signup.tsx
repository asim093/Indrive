import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Login_layout from "../../components/Login_layout";
import { Link, useRouter } from "expo-router"; 

const Signup = () => { 
  const [Name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [userIds, setUserIds] = React.useState<string[]>([]);
  
  const router = useRouter(); 

  const registerUser = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        createdAt: new Date(),
        role : "User",
      });
      
      alert("User SignUp Successful");
      setUserIds((prevIds) => [...prevIds, docRef.id]);
      
      router.push("/Auth/Login"); 

    } catch (error: any) {
      const errorMessage = error.message;
      console.log("Error:", errorMessage);
      alert("Error during signup: " + errorMessage);
    }
  };

  return (
    <SafeAreaProvider>
      <Login_layout>
        <View style={styles.form_container}>
          <Text style={styles.headerText}>Signup User</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder="Enter your Name"
            value={Name}
          />
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
            <Button title="Signup" onPress={registerUser} />
          </View>

          <FlatList
            data={userIds}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>User ID: {item}</Text>
              </View>
            )}
            keyExtractor={(item) => item}
          />
          <View style={styles.linkContainer}>
            <Text>Already a User? </Text>
            <Link href="/Auth/Login" style={styles.link}>
              Login
            </Link>
          </View>
        </View>
      </Login_layout>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  form_container: {
    height: 310,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 0,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#c0f11c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    color: "#555",
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

export default Signup; 
