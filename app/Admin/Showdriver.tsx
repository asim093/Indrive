import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase/config";
import AdminPanel from "../../components/Admin_Layout";

interface Driver {
  id: string;
  driverName: string;
  phoneNumber: string;
  email: string;
  vehicle: string;
}

const Showdriver = () => {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const driversCollection = collection(db, "drivers");

    const unsubscribe = onSnapshot(
      driversCollection,
      (snapshot) => {
        const driverList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Driver[];
        setDrivers(driverList);
      },
      (error) => {
        console.error("Error fetching drivers: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "drivers", id));
      Alert.alert("Success", "Driver deleted successfully.");
    } catch (error) {
      console.error("Error deleting driver: ", error);
      Alert.alert("Error", "Failed to delete driver.");
    }
  };

  const handleEdit = (item: Driver) => {
    router.push({
      pathname: "/Admin/Editdriver",
      params: {
        id: item.id,
        driverName: item.driverName,
        phoneNumber: item.phoneNumber,
        vehicle: item.vehicle,
      },
    });
  };

  const renderDriver = ({ item }: { item: Driver }) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 16 }}>{item.driverName}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          title="Detail"
          onPress={() => {
            router.push({
              pathname: "/Admin/Driverdetails",
              params: {
                id: item.id,
                driverName: item.driverName,
                driveremail: item.email,
                phoneNumber: item.phoneNumber,
                vehicle: item.vehicle,
              },
            });
          }}
        />
        <Button
          title="Edit"
          onPress={() => handleEdit(item)}
        />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AdminPanel>
        <Text style={{ fontSize: 24, textAlign: "center", marginVertical: 20 }}>
          Driver List
        </Text>
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.id}
          renderItem={renderDriver}
        />
      </AdminPanel>
    </SafeAreaView>
  );
};

export default Showdriver;
