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
  Modal,
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
  GeoPoint,
} from "firebase/firestore";
import { NetworkContext, currencyCodes } from "../exports";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dropdown } from "react-native-element-dropdown";

export default function Name({ route }) {
  const SCWIDTH = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginLeft: "5%",
          // marginTop: "20%",
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          Account
        </Text>
        <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 200 }}>
          Please fill in your account information!
        </Text>
        <View
          style={{
            height: 75,
            width: "100%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            NAME
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Ionicons
              name={"person-outline"}
              size={18}
              style={{ color: "#400235", marginRight: 10, marginTop: 3 }}
            />
            <TextInput
              textContentType="oneTimeCode"
              placeholder={"Type here..."}
              value={name}
              onChangeText={(text) => setName(text)}
              autoCapitalize="words"
              autoComplete="off"
              maxLength={20}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30 - 30,
              }}
            />
          </View>
        </View>
        <View>
          {!nameValid ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                style={{ color: "red" }}
              />
              <Text
                style={{
                  color: "red",
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                Name cannot be empty!
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>

        <Pressable
          style={{
            width: "90%",
            marginLeft: "5%",
            height: 50,
            backgroundColor: "white",
            marginTop: "12%",
            borderRadius: 10,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#BF41B7",
          }}
          onPress={async () => {
            setNameValid(1);
            if (name == "") {
              setNameValid(0);
            } else {
              const docRef = doc(db, "users", route.params.user);
              await updateDoc(docRef, { name: name });
              navigation.navigate("TabNav", {
                screen: "Home",
                user: route.params.user,
              });
            }
          }}
        >
          <Text style={{ color: "#BF41B7", fontSize: 16, fontWeight: 500 }}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
