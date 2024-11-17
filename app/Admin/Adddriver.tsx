import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase/config";
import { Picker } from "@react-native-picker/picker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AdminPanel from "@/components/Admin_Layout";
import { useRouter } from "expo-router";

export default function AddDriver() {
  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicle, setVehicle] = useState("Bike"); // Default to 'Bike'
  const router = useRouter();

  const handleAddDriver = async () => {
    if (!driverName || !email || !phoneNumber || !password || !vehicle) {
      alert("Please fill all the fields");
      return;
    }
    
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      
      await addDoc(collection(db, "drivers"), {
        driverName,
        email,
        phoneNumber,
        vehicle,
      });
      
      
      
      alert("Driver added successfully");
      
      setDriverName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setVehicle("Bike"); 
      
      router.push("/Admin/Showdriver");




    } catch (error:any) {
      console.error("Error adding driver: ", error);
      alert(`Failed to add driver: ${error.message}`);
    }
  };

  return (
    <AdminPanel>
      <View style={styles.container}>
        <Text style={styles.label}>Driver Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Driver Name"
          value={driverName}
          onChangeText={setDriverName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Vehicle Type</Text>
        <Picker
          selectedValue={vehicle}
          style={styles.input}
          onValueChange={(itemValue) => setVehicle(itemValue)}
        >
          <Picker.Item label="Bike" value="Bike" />
          <Picker.Item label="Rickshaw" value="Rickshaw" />
          <Picker.Item label="AC Car" value="AC Car" />
          <Picker.Item label="Non-AC Car" value="Non-AC Car" />
          <Picker.Item label="Truck" value="Truck" />
        </Picker>

        <TouchableOpacity style={styles.addButton} onPress={handleAddDriver}>
          <Text style={styles.buttonText}>Add Driver</Text>
        </TouchableOpacity>
      </View>
    </AdminPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#00c853",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    height: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
