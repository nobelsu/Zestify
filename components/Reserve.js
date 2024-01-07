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

const SCWIDTH = Dimensions.get("window").width;

export default function Reserve({ route }) {
  const navigation = useNavigation();
  useEffect(() => {}, []);
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
                screen: "Home",
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
          <Text style={{ flex: 1, fontWeight: 600 }}>Collection time</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {route.params.collectionStart} - {route.params.collectionEnd}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "90%", marginBottom: 20 }}>
          <Text style={{ flex: 1, fontWeight: 600 }}>Location</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>
            {route.params.loc}
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
            <Text>${(route.params.price * route.params.pur).toFixed(2)}</Text>
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
      </View>
    </ScrollView>
  );
}
