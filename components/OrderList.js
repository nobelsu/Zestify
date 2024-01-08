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
import { SwipeListView } from "react-native-swipe-list-view";
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
} from "firebase/firestore";
import { NetworkContext } from "../exports";

const ini = [
  { val: "Pending", color: "black" },
  { val: "Cancelled", color: "red" },
  { val: "Claimed", color: "purple" },
];

const SCWIDTH = Dimensions.get("window").width;

export default function OrderList() {
  const value = useContext(NetworkContext);
  const user = value.params.user;
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
      const ref = collection(db, "stores");
      const q = query(ref, where("name", "!=", ""));

      const orderRef = collection(db, "orders");
      const orderSnap = query(orderRef, where("user", "==", user));
      onSnapshot(orderSnap, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    }
    Temp();
  }, []);

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
        <Pressable>
          <Ionicons name="options-outline" size={25} />
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
          const item = data.item;
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
                  const docRef = doc(db, "stores", item.store);
                  const docSnap = await getDoc(docRef);
                  navigation.navigate("Reserve", {
                    ...docSnap.data(),
                    user: user,
                    store: item.store,
                    orderID: item.id,
                    username: name,
                    pur: item.quantity,
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
                  style={{ flexDirection: "row", width: "90%", height: "90%" }}
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
                      {item.storeName}
                    </Text>
                    <Text>
                      <Text
                        style={{
                          color: "#BF41B7",
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        {item.quantity}
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
                    <Text style={{ color: ini[item.status].color }}>
                      {" "}
                      {ini[item.status].val}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>

            // <View
            //   style={{
            //     marginTop: 10,
            //     height: SCWIDTH * 0.26,
            //     width: SCWIDTH * 0.9,
            //     marginLeft: SCWIDTH * 0.05,
            //     marginRight: SCWIDTH * 0.05,
            //     backgroundColor: "white",
            //     borderRadius: 10,
            //     flexDirection: "row",
            //   }}
            // >
            //   <Image
            //     source={{ uri: item.logo }}
            //     style={{
            //       width: SCWIDTH * 0.2,
            //       marginLeft: SCWIDTH * 0.03,
            //       marginTop: SCWIDTH * 0.03,
            //       aspectRatio: 1,
            //       borderRadius: 5000,
            //       borderWidth: 2,
            //       borderColor: "white",
            //     }}
            //   />
            //   <Text>{item.name}</Text>
            // </View>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          if (data.item.status) {
            return <View />;
          }
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
                onPress={async () => {}}
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
