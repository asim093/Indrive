import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';

// Define the type for driver details
interface DriverDetailsType {
  driverName?: string;
  phoneNumber?: string;
  vehicle?: string;
  email?: string;
}

const DriverDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  
  const [driverDetails, setDriverDetails] = useState<DriverDetailsType | null>(null);
  
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      const fetchData = async () => {
        const { driverName, phoneNumber, vehicle, email } = params;
        setDriverDetails({ driverName, phoneNumber, vehicle, email });
      };

      fetchData();
    }
  }, [params]); 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          {driverDetails ? (
            <>
              <Text style={styles.driverName}>{driverDetails.driverName || 'No Name Provided'}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.driverDetails}>Phone:</Text>
                <Text style={styles.driverDetailsValue}>{driverDetails.phoneNumber || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.driverDetails}>Vehicle:</Text>
                <Text style={styles.driverDetailsValue}>{driverDetails.vehicle || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.driverDetails}>Email:</Text>
                <Text style={styles.driverDetailsValue}>{driverDetails.email || 'N/A'}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Loading data...</Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/Admin/Showdriver')}>
            <Text style={styles.buttonText}>Back to Driver List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:100,
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
  driverName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  driverDetails: {
    fontSize: 16,
    color: '#555',
  },
  driverDetailsValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
  actions: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#0A74DA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DriverDetails;
