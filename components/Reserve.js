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
import QRCode from "react-native-qrcode-svg";
import { Rating } from "react-native-ratings";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const SCWIDTH = Dimensions.get("window").width;

export default function Reserve({ route }) {
  const navigation = useNavigation();
  // const value = useContext(NetworkContext);
  // const user = value.params.user;
  const [show, setShow] = useState(false);
  const [rate, setRate] = useState(2.5);
  const [disabled, setDisabled] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "orders", route.params.orderID);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().status == 2 && docSnap.data().reviewed == false) {
        setShow(true);
      }
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
              navigation.navigate("TabNav", {
                screen: "Orders",
                user: route.params.user,
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
          {route.params.name}
        </Text>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 10 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Date</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {route.params.date}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 10 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Collection time</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {route.params.collection}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Location</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {route.params.address}
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
              {route.params.username}
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
            {route.params.pur}
          </Text>
          <Text>mystery boxes!</Text>
        </View>
        <View style={{ width: "90%", flexDirection: "row", marginTop: 15 }}>
          <View style={{ flex: 1 }}>
            <Text>Total</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: !route.params.currency
                  ? "IDR"
                  : route.params.currency,
              }).format(Number(route.params.price) * route.params.pur)}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 15,
            marginBottom: 15,
            width: "65%",
            textAlign: "center",
          }}
        >
          Remember to show the{" "}
          <Text style={{ fontWeight: 600, color: "#BF41B7" }}>QR code</Text>{" "}
          during collection!
        </Text>

        <QRCode value={route.params.orderID} size={SCWIDTH * 0.65} />
        <Text
          style={{
            textAlign: "center",
            width: "90%",
            fontStyle: "italic",
            fontSize: 12,
            marginTop: 10,
          }}
        >
          ID: {route.params.orderID}
        </Text>
        {show ? (
          <View
            style={{
              width: "90%",
              marginTop: 30,
              // marginBottom: 20,
              borderTopWidth: 0.2,
              paddingTop: 15,
              alignItems: "center",
            }}
          >
            {!vis ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text>Rate your experience!</Text>
                <Rating
                  onFinishRating={(rating) => {
                    setRate(rating);
                  }}
                  style={{ marginTop: 20 }}
                  imageSize={30}
                  fractions={1}
                  jumpValue={0.5}
                />
                <Pressable
                  style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "#BF41B7",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    marginTop: 30,
                  }}
                  disabled={disabled}
                  onPress={async () => {
                    const docRef = doc(db, "stores", route.params.store);
                    const docSnap = await getDoc(docRef);
                    await updateDoc(docRef, {
                      rating: docSnap.data().rating + rate / 5,
                      revcnt: docSnap.data().revcnt + 1,
                    });
                    const docRef2 = doc(db, "orders", route.params.orderID);
                    await updateDoc(docRef2, { reviewed: true });
                    setVis(true);
                    setDisabled(false);
                  }}
                >
                  <Text style={{ color: "white", fontSize: 14 }}>Submit</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Text>Thank you for your review!</Text>
              </View>
            )}
          </View>
        ) : (
          <View />
        )}
      </View>
    </ScrollView>
  );
}
