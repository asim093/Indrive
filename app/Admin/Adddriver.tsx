import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  Picker
} from "react-native";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import AdminPanel from "../../components/Admin_Layout";
import "../../global.css";
import { app } from "../../config/firebase/config"; 

const AddDriver = () => {
  const db = getFirestore(app); 
  const [driverName, setDriverName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{11}$/; 
    return phoneRegex.test(number);
  };

  const handleSubmit = async () => {
    // Check for empty fields
    if (!driverName || !vehicle || !phoneNumber || !email) {
      alert("Validation Error: Please fill in all fields.");
      return; // Stop the submission
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Invalid Phone Number: Please enter a valid 11-digit phone number.");
      return; // Stop the submission
    }

    try {
      // Add the driver document to Firestore
      const docRef = await addDoc(collection(db, "drivers"), {
        driverName,
        vehicle,
        phoneNumber,
        email,
      });

      // Update the document to include the generated ID
      const driverDocRef = doc(db, "drivers", docRef.id); // Get a reference to the newly created document
      await updateDoc(driverDocRef, { id: docRef.id }); // Update the document with the ID

      alert("Driver added successfully");

      // Clear the form fields after successful submission
      setDriverName("");
      setVehicle("");
      setPhoneNumber("");
      setEmail("");
    } catch (e) {
      console.error("Error adding driver: ", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AdminPanel>
        <ScrollView className="p-4 flex-grow border border-indigo-600 h-full">
          <Text style={{ marginVertical: 10, fontSize: 30, textAlign: "center" }}>
            Add Driver
          </Text>

          <View style={{ marginVertical: 10 }}>
            <Text className="font-semibold mb-1">Driver Name:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 5,
                padding: 10,
                width: "100%",
              }}
              value={driverName}
              onChangeText={setDriverName}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className="font-semibold mb-1">Vehicle:</Text>
            <Picker
              selectedValue={vehicle}
              style={{
                height: 50,
                width: "100%",
                borderColor: "#d1d5db",
                borderWidth: 1,
                borderRadius: 5,
              }}
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
            <Text className="font-semibold mb-1">Phone Number:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 5,
                padding: 10,
                width: "100%",
              }}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={11} 
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text className="font-semibold mb-1">Email:</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#d1d5db",
                borderRadius: 5,
                padding: 10,
                width: "100%",
              }}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginVertical: 20 }}>
            <Button title="Add Driver" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </AdminPanel>
    </SafeAreaView>
  );
};

export default AddDriver;
