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

export default function StoreCamera() {
  const navigation = useNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  });

  if (!permission) return <View></View>;

  if (!permission.granted) return <View></View>;

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Camera
        style={{ flex: 1 }}
        type={CameraType.back}
        onBarCodeScanned={async (scanned) => {
          const id = scanned.data;
          navigation.navigate("StoreOrderDetails", { id: id });
        }}
      ></Camera>
    </View>
  );
  // const device = useCameraDevice("back");
  // if (device == null) return <NoCameraErrorView />;
  // return (
  //   <Camera
  //     style={{ height: "100%", width: "100%" }}
  //     device={device}
  //     isActive={true}
  //   />
  // );
}
