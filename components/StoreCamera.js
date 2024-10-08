import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useContext, useCallback, } from "react";
import { useNavigation, useIsFocused, } from "@react-navigation/native";
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
import { useCameraPermissions, CameraView, CameraType } from "expo-camera";

export default function StoreCamera() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [vis, setVis] = useState(false);
  const isFocused = useIsFocused();
  const value = useContext(NetworkContext);
  const [user, setUser] = useState(value.params.user);

  useEffect(() => {
    requestPermission();
  });

  useEffect(() => {
    setUser(value.params.user);
  }, [isFocused])

  function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

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
      <CameraView
        style={{ flex: 1 }}
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={async (scanned) => {
          const id = scanned.data;
          if (!isAlphaNumeric(id)) {
            setVis(true);
          } else {
            const ordersRef = doc(db, "stores", user);
            const orderSnap = await getDoc(ordersRef);
            try {
              if (orderSnap.data().orders.includes(id)) {
                navigation.navigate("StoreOrderDetails", { id: id });
              } else {
                setVis(true);
              }
            } catch(error) {
              setVis(true);
              throw(error);
            }
          }
        }}
      ></CameraView>
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
