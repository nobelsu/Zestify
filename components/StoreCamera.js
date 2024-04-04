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
  Modal,
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
  const [vis, setVis] = useState(false);

  useEffect(() => {
    requestPermission();
  });

  function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

  if (!permission) return <View></View>;

  if (!permission.granted) return <View></View>;

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Modal transparent={true} visible={vis} animationType="fade">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVis(false);
          }}
        >
          <View
            style={{
              height: 210,
              width: 280,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <Ionicons color={"#BF41B7"} name="alert-circle-outline" size={80} />
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 600,
                fontSize: 16,
                width: "90%",
                textAlign: "center",
              }}
            >
              Invalid Order ID
            </Text>
            <Text style={{ width: "90%", textAlign: "center" }}>
             Please check your QR code!
            </Text>

            
          </View>
        </Pressable>
      </Modal>
      <Camera
        style={{ flex: 1 }}
        type={CameraType.back}
        onBarCodeScanned={async (scanned) => {
          const id = scanned.data;
          if (!isAlphaNumeric(id)) {
            setVis(true);

          } else {
          const ordersRef = doc(db, "orders", id);
          ordersRef.get()
              .then((docSnapshot) => {
                if (docSnapshot.exists) {
                  navigation.navigate("StoreOrderDetails", { id: id });
                } else {
                  setVis(true);
                }
            });
          }
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
