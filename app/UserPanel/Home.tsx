import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface VehicleOption {
  id: number;
  name: string;
  icon: string;
}

export default function RideBookingScreen() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [destinationLocation, setDestinationLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(
    null
  );
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const vehicleOptions: VehicleOption[] = [
    { id: 1, name: "Moto", icon: "🏍️" },
    { id: 2, name: "Ride Mini", icon: "🚗" },
    { id: 3, name: "Ride A/C", icon: "🚘" },
    { id: 4, name: "Auto", icon: "🛺" },
    { id: 5, name: "City Taxi", icon: "🚕" },
  ];

  const router = useRouter();

  const accessToken =
    "pk.eyJ1Ijoiam9objEzMTMiLCJhIjoiY20zOW1xdHE5MTF2bjJ2c2M1enh1NGliaCJ9.3S9fQPHPHk3_3wnDjh4yIA";

  useEffect(() => {
    (async () => {
      const role = await AsyncStorage.getItem("Role");
      if (role === "Admin") {
        router.push("/Admin/Main");
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.error("Permission to access location was denied");
      }
    })();
  }, []);

  const handleVehicleSelect = (vehicle: VehicleOption) => {
    setSelectedVehicle(vehicle);
  };

  const fetchSuggestions = async (text: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?proximity=${userLocation?.longitude},${userLocation?.latitude}&country=PK&access_token=${accessToken}`
      );
      const data = await response.json();
      setSuggestions(data.features.map((feature: any) => feature.place_name));
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const fetchRoute = async () => {
    if (userLocation && destinationLocation) {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destinationLocation.longitude},${destinationLocation.latitude}?geometries=geojson&access_token=${accessToken}`
      );
      const data = await response.json();
      const route = data.routes[0].geometry.coordinates.map(
        (coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0],
        })
      );
      setRouteCoordinates(route);

      const distanceInMeters = data.routes[0].distance;
      const distanceInKm = distanceInMeters / 1000;
      setDistance(distanceInKm);

      const pricePerKm = 10;
      setPrice(distanceInKm * pricePerKm);
    }
  };

  const Finddriver = async () => {
    if (destination && price && distance) {
      router.push({
        pathname: "/UserPanel/Bookride",
        query: {
          vehicle: selectedVehicle,
          Rs: price,
          route: distance,
          km: destination,
        },
      });
    } else {
      console.log("Please provide all details (destination, price, distance).");
    }
  };

  const handleSetDestination = async () => {
    try {
      const geocode = await LocationGeocoding.geocodeAsync(destination);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        setDestinationLocation({ latitude, longitude });
        fetchRoute();
      } else {
        console.error("No location found for this address");
      }
    } catch (error) {
      console.error("Error fetching destination location", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          {userLocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation
            >
              <Marker coordinate={userLocation} title="Your Location" />
              {destinationLocation && (
                <Marker coordinate={destinationLocation} title="Destination" />
              )}
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#00c853"
                  strokeWidth={4}
                />
              )}
            </MapView>
          )}

          <View style={styles.overlay}>
            <Text style={styles.label}>Current Location</Text>
            <TextInput
              style={styles.input}
              placeholder="From"
              editable={false}
              value="Plot A 1/14 (Nazimabad, Block 4)"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Destination"
              value={destination}
              onChangeText={(text) => {
                setDestination(text);
                fetchSuggestions(text);
              }}
            />
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setDestination(item);
                      setSuggestions([]);
                    }}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity
              style={styles.okButton}
              onPress={handleSetDestination}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>

            <FlatList
              data={vehicleOptions}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.vehicleOption,
                    selectedVehicle?.id === item.id && styles.selectedVehicle,
                  ]}
                  onPress={() => handleVehicleSelect(item)}
                >
                  <Text style={styles.vehicleIcon}>{item.icon}</Text>
                  <Text style={styles.vehicleName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.findDriverButton}
              onPress={Finddriver}
            >
              <Text style={styles.buttonText}>Find a driver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  okButton: {
    backgroundColor: "#00c853",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  vehicleOption: { alignItems: "center", marginRight: 10, padding: 10 },
  selectedVehicle: { backgroundColor: "#e0f7fa", borderRadius: 5 },
  vehicleIcon: { fontSize: 40 }, // Increase font size for better display
  vehicleName: { marginTop: 5, fontSize: 14 },
  findDriverButton: {
    backgroundColor: "#00c853",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
  suggestionText: { padding: 10, backgroundColor: "#f9f9f9" },
  priceContainer: { marginTop: 10 },
  priceText: { fontSize: 16, fontWeight: "bold" },
});
