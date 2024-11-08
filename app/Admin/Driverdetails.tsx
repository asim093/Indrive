import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DriverDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
         
          <Text style={styles.driverName}>{params.driverName}</Text>
          <Text style={styles.driverDetails}>Phone Number: {params.phoneNumber}</Text>
          <Text style={styles.driverDetails}>Vehicle: {params.vehicle}</Text>
          <Text style={styles.driverDetails}>Email: {params.driveremail}</Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Back to Driver List"
            onPress={() => router.back()}
            color="#0A74DA"  
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  driverDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  actions: {
    width: '100%',
    marginTop: 20,
  },
});

export default DriverDetails;
