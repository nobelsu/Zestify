import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { NetworkContext } from "../exports";
import { Camera, CameraType } from "expo-camera";

export default function StoreOrderDetails({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [dataStore, setStore] = useState({});
  const [dataUser, setUser] = useState({});

  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "orders", route.params.orderID);
      const docSnap = await getDoc(docRef);
      const storeid = docSnap.data().store;
      const userid = docSnap.data().user;
      const docRef2 = doc(db, "users", userid);
      const docRef3 = doc(db, "stores", storeid);
      const docSnap2 = await getDoc(docRef2);
      const docSnap3 = await getDoc(docRef3);

      setData({ ...docSnap.data() });
      setStore({ ...docSnap3.data() });
      setUser({ ...docSnap2.data() });
    }
    Temp();
  }, []);
  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            marginTop: "15%",
            marginLeft: "5%",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("TabNav2", {
                screen: "Camera",
              });
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              color="black"
              size={36}
              style={{}}
            />
          </Pressable>
        </View>
        <View style={{ marginTop: "16%", flex: 1 }}>
          <Text
            style={{
              // fontWeight: 200,
              width: "90%",
              fontSize: 22,
              marginLeft: "5%",
              fontWeight: 800,
            }}
            numberOfLines={1}
          >
            Order summary
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          marginBottom: 50,
          paddingTop: 25,
          paddingBottom: 25,
          marginLeft: "5%",
          width: "90%",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
          {dataStore.name}
        </Text>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 10 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Collection time</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {dataStore.collectionTime}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Location</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {dataStore.address}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            width: "90%",
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Text>
            <Text style={{ color: "#BF41B7", fontWeight: 600 }}>
              {dataUser.name}
            </Text>{" "}
            has purchased
          </Text>
          <Text
            style={{
              marginLeft: 15,
              marginRight: 15,
              fontSize: 50,
              fontWeight: 900,
            }}
          >
            {data.quantity}
          </Text>
          <Text>mystery boxes!</Text>
        </View>
        <View style={{ width: "90%", flexDirection: "row", marginTop: 15 }}>
          <View style={{ flex: 1 }}>
            <Text>Total</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text>${data.price}</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={{
          width: "90%",
          backgroundColor: "#BF41B7",
          height: 50,
          marginLeft: "5%",
          borderRadius: 15,
          marginTop: 20,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={async () => {
          const docRef = doc(db, "orders", route.params.orderID);
          const docRef2 = doc(db, "stores", storeid);
          const docSnap = await getDoc(docRef2);
          await updateDoc(docRef, { status: 2 });
          await updateDoc(docRef2, {
            qsold: docSnap.data().qsold + data.quantity,
          });
          navigation.navigate("TabNav2", {
            screen: "Camera",
          });
        }}
      >
        <Text style={{ color: "white" }}>Confirm</Text>
      </Pressable>
    </ScrollView>
  );
}
