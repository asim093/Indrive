import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Picker } from "@react-native-picker/picker";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../config/firebase/config'; // Assuming you have set up Firebase config in firebase.js

// Vehicle Options
const vehicleOptions = [
  { label: 'Select Vehicle', value: '' },
  { label: 'Car', value: 'car' },
  { label: 'Bike', value: 'bike' },
  { label: 'AC Car', value: 'ac_car' },
  { label: 'Non-AC Car', value: 'non_ac_car' },
  { label: 'Rickshaw', value: 'rickshaw' },
];

export default function RideBookingScreen() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [drivers, setDrivers] = useState<any[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [driverDetails, setDriverDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch user location when the component mounts
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  // Fetch drivers based on the selected vehicle
  const fetchDrivers = async () => {
    if (!selectedVehicle) return;

    const driversRef = db.collection('drivers');
    const snapshot = await driversRef.where('vehicle', '==', selectedVehicle).get();
    const fetchedDrivers = snapshot.docs.map((doc:any) => doc.data());
    setDrivers(fetchedDrivers);
  };

  // Calculate distance using Mapbox Directions API
  const calculateDistance = async (driverLocation: { latitude: number; longitude: number }) => {
    if (!userLocation) return;

    const origin = `${userLocation.longitude},${userLocation.latitude}`;
    const destination = `${driverLocation.longitude},${driverLocation.latitude}`;

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
    );
    const data = await response.json();
    const routeDistance = data.routes[0]?.distance; // Distance in meters
    setDistance(routeDistance / 1000); // Convert to kilometers
  };

  // Calculate price based on distance (example: price per km is 10)
  const calculatePrice = (distance: number) => {
    if (!distance) return;
    const pricePerKm = 10; // Example rate per km
    setPrice(distance * pricePerKm);
  };

  // Handle selecting a driver
  const handleFindDriver = async () => {
    const selectedDriver = drivers[0]; // Choose the first driver (could implement a more sophisticated selection)
    setDriverDetails(selectedDriver);
    await calculateDistance(selectedDriver.location); // Assuming driver has a `location` field with latitude/longitude
    calculatePrice(distance || 0); // Calculate price for the ride
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Vehicle</Text>
      <Picker selectedValue={selectedVehicle} onValueChange={setSelectedVehicle}>
        {vehicleOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      {/* Destination Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Destination"
        value={destination}
        onChangeText={setDestination}
      />

      {/* Find Driver Button */}
      <TouchableOpacity style={styles.findDriverButton} onPress={handleFindDriver}>
        <Text style={styles.buttonText}>Find a Driver</Text>
      </TouchableOpacity>

      {/* Show Driver Data */}
      {driverDetails && (
        <View style={styles.driverDetails}>
          <Text style={styles.driverText}>Driver Name: {driverDetails.driverName}</Text>
          <Text style={styles.driverText}>Email: {driverDetails.email}</Text>
          <Text style={styles.driverText}>Phone: {driverDetails.phoneNumber}</Text>
          <Text style={styles.driverText}>Vehicle: {driverDetails.vehicle}</Text>
          <Text style={styles.driverText}>Distance: {distance} km</Text>
          <Text style={styles.driverText}>Price: Rs. {price}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  findDriverButton: {
    backgroundColor: '#00c853',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  driverDetails: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  driverText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
