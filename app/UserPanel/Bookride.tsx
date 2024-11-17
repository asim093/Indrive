import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookRideScreen({ route }: any) {
  const { price, distance, selectedVehicle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Details</Text>
      <Text style={styles.text}>Price: {price} PKR</Text>
      <Text style={styles.text}>Distance: {distance} km</Text>
      <Text style={styles.text}>Vehicle: {selectedVehicle?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold' },
  text: { fontSize: 18, marginVertical: 5 },
});
