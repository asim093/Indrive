import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import AdminPanel from "../../components/Admin_Layout";
import "../../global.css";
import { app, auth } from "../../config/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AddDriver = () => {
  const db = getFirestore(app);
  const [driverName, setDriverName] = useState<string>("");
  const [vehicle, setVehicle] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async () => {
    if (!driverName || !vehicle || !phoneNumber || !email || !password) {
      alert("Validation Error: Please fill in all fields.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Invalid Phone Number: Please enter a valid 11-digit phone number.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "drivers"), {
        driverName,
        vehicle,
        phoneNumber,
        email,
        Role: "driver",
      });

      await createUserWithEmailAndPassword(auth, email, password);

      await updateDoc(docRef, { id: docRef.id });

      alert("Driver added successfully");

      setDriverName("");
      setVehicle("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
    } catch (e:any) {
      alert("Error adding driver: " + e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AdminPanel>
        <ScrollView style={{ padding: 16 }}>
          <Text style={{ marginVertical: 10, fontSize: 30, textAlign: "center" }}>
            Add Driver
          </Text>

          <View style={{ marginVertical: 10 }}>
            <Text>Driver Name:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 5, padding: 10 }}
              value={driverName}
              onChangeText={setDriverName}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text>Vehicle:</Text>
            <Picker
              selectedValue={vehicle}
              style={{ height: 50, borderColor: "#d1d5db", borderWidth: 1, borderRadius: 5 }}
              onValueChange={(itemValue: string) => setVehicle(itemValue)}
            >
              <Picker.Item label="Select Vehicle" value="" />
              <Picker.Item label="Car" value="car" />
              <Picker.Item label="Bike" value="bike" />
              <Picker.Item label="AC Car" value="ac_car" />
              <Picker.Item label="Non-AC Car" value="non_ac_car" />
              <Picker.Item label="Rickshaw" value="rickshaw" />
            </Picker>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text>Phone Number:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 5, padding: 10 }}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text>Email:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 5, padding: 10 }}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text>Password:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 5, padding: 10 }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Button title="Add Driver" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </AdminPanel>
    </SafeAreaView>
  );
};

export default AddDriver;
