import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase/config";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useGlobalSearchParams } from "expo-router";

interface DriverParams {
  id: string;
  driverName: string;
  phoneNumber: string;
  vehicle: string;
}

const Editdriver = () => {
  const params = useGlobalSearchParams<DriverParams>();
  const router = useRouter();

  const [driverName, setDriverName] = useState(params.driverName || "");
  const [phoneNumber, setPhoneNumber] = useState(params.phoneNumber || "");
  const [vehicle, setVehicle] = useState(params.vehicle || "");

  useEffect(() => {
    console.log("Params received in Editdriver:", params);
  }, [params]);

  const handleUpdate = async () => {
    if (!driverName || !phoneNumber || !vehicle) {
      alert("Error: Please fill out all fields.");
      return;
    }

    if (!params.id) {
      alert("Error: Driver ID is missing.");
      return;
    }

    try {
      const driverDocRef = doc(db, "drivers", params.id);
      await updateDoc(driverDocRef, {
        driverName,
        phoneNumber,
        vehicle,
      });
      alert("Success: Driver updated successfully.");
      router.back();
    } catch (error) {
      console.error("Error updating driver:", error);
      alert("Error: Failed to update driver.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Driver</Text>
      <TextInput
        placeholder="Driver Name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
        }}
        value={driverName}
        onChangeText={setDriverName}
      />
      <TextInput
        placeholder="Phone Number"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 15,
        }}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Picker
        selectedValue={vehicle}
        onValueChange={(itemValue: any) => setVehicle(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Picker.Item label="Select Vehicle" value="" />
        <Picker.Item label="Car" value="car" />
        <Picker.Item label="Bike" value="bike" />
        <Picker.Item label="AC Car" value="ac_car" />
        <Picker.Item label="Non-AC Car" value="non_ac_car" />
        <Picker.Item label="Rickshaw" value="rickshaw" />
      </Picker>
      <Button title="Update Driver" onPress={handleUpdate} />
    </View>
  );
};

export default Editdriver;
