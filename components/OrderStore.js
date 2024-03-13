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

const ini = [
  { val: "Pending", color: "black" },
  { val: "Cancelled", color: "red" },
  { val: "Claimed", color: "#BF41B7" },
];

const SCWIDTH = Dimensions.get("window").width;

export default function OrderStore() {
  const value = useContext(NetworkContext);
  const user = value.params.user;
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  const [pressed, setPressed] = useState(true);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", user);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
      const ref = collection(db, "stores");

      const orderRef = collection(db, "orders");
      const orderSnap = query(orderRef, where("store", "==", user));
      onSnapshot(orderSnap, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    }
    Temp();
  }, [pressed]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          width: "90%",
          marginLeft: "5%",
          height: 50,
          marginTop: "15%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 20,
          marginBottom: "3%",
        }}
      >
        <Pressable
          onPress={() => {
            if (focused) {
              setVal("");
              setFocused(!focused);
              Keyboard.dismiss();
            }
            return;
          }}
        >
          <Ionicons
            name={focused ? "close-outline" : "search-outline"}
            size={22}
          />
        </Pressable>
        <TextInput
          placeholder="Search..."
          style={{
            width: SCWIDTH * 0.64,
            height: 30,
            marginLeft: 8,
            marginRight: 8,
            padding: 5,
            fontSize: 14,
          }}
          value={val}
          onChangeText={(text) => {
            setVal(text);
          }}
          onFocus={() => {
            setFocused(true);
          }}
        />
        <Pressable
          onPress={() => {
            setPressed(!pressed);
          }}
        >
          <Ionicons name="refresh-outline" size={25} />
        </Pressable>
      </View>
      <Text
        style={{
          marginLeft: "5%",
          marginTop: "5%",
          marginBottom: "2%",
          fontSize: 30,
          fontWeight: 900,
        }}
      >
        Orders
      </Text>
      <SwipeListView
        data={orders}
        renderItem={(data, rowMap) => {
          return (
            <View
              style={{
                height: 110,
                width: SCWIDTH * 0.9,
                marginLeft: SCWIDTH * 0.05,
                backgroundColor: "white",
                marginTop: 10,
                borderRadius: 10,

                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Pressable
                onPress={async () => {
                  const docRef = doc(db, "stores", data.item.store);
                  const docRef2 = doc(db, "users", data.item.user);
                  const docSnap = await getDoc(docRef);
                  const docSnap2 = await getDoc(docRef2);
                  navigation.navigate("StoreOrderDetails", {
                    ...docSnap.data(),
                    user: user,
                    store: data.item.store,
                    orderID: data.item.id,
                    username: docSnap2.data().name,
                    pur: data.item.quantity,
                  });
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    height: "90%",
                  }}
                >
                  <View style={{ flex: 2, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        marginBottom: 10,
                        width: "90%",
                      }}
                      numberOfLines={1}
                    >
                      {data.item.storeName}
                    </Text>
                    <Text>
                      <Text
                        style={{
                          color: "#BF41B7",
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        {data.item.quantity}
                      </Text>{" "}
                      mystery boxes reserved!
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ marginBottom: 5, fontWeight: 600 }}>
                      Status:
                    </Text>
                    <Text style={{ color: ini[data.item.status].color }}>
                      {" "}
                      {ini[data.item.status].val}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          return (
            <View
              style={{
                height: "95%",
                marginTop: "2.5%",
                width: 75,
                marginLeft: SCWIDTH * 0.95 - 75,
                marginRight: SCWIDTH * 0.05,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "red",
                  borderRadius: 25,
                }}
                onPress={async () => {
                  const orderRef = doc(db, "orders", data.item.id);
                  const storeRef = doc(db, "stores", data.item.store);
                  const storeSnap = await getDoc(storeRef);
                  if (data.item.status == 0) {
                    await updateDoc(storeRef, {
                      stock: storeSnap.data().stock + data.item.quantity,
                    });
                    await updateDoc(orderRef, {
                      status: 1,
                    });
                    rowMap[data.item.key].closeRow();
                  } else {
                    const ref = doc(db, "stores", data.item.store);
                    const snap = await getDoc(ref);
                    const ori = snap.data()["orders"];
                    ori.splice(ori.indexOf(data.item.id), 1);
                    await updateDoc(ref, { orders: ori });

                    const ref2 = doc(db, "stores", data.item.store);
                    const snap2 = await getDoc(ref2);
                    const ori2 = snap2.data()["orders"];
                    ori2.splice(ori2.indexOf(data.item.id), 1);
                    await updateDoc(ref2, { orders: ori2 });

                    await deleteDoc(doc(db, "orders", data.item.id));
                  }
                }}
              >
                <Ionicons name="trash-outline" size={24} color="white" />
              </Pressable>
            </View>
          );
        }}
        style={{ marginBottom: 20 }}
        rightOpenValue={-75}
      />
    </View>
  );
}
