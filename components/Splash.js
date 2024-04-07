import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
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
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
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
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import SVG from "../assets/logo.svg";

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function Temp() {
          const docRef = doc(db, "users", user);
          const docSnap = await getDoc(docRef);
          if (docSnap.type) {
            navigation.navigate("TabNav2", {
              screen: "Store",
              user: user.uid,
            });
          } else {
            navigation.navigate("TabNav", {
              screen: "Home",
              user: user.uid,
            });
          }
        }
        Temp();
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#BF41B7",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 120, height: 120 }}
      />
    </View>
  );
}

// 6210 LINES OF CODE
// JKLDGFHSJ IM FINALLY DONE HELP
