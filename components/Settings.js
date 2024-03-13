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
import { getAuth, signOut } from "firebase/auth";

export default function Settings() {
  const navigation = useNavigation();
  const value = useContext(NetworkContext);
  const user = value.params.user;
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          width: "90%",
          backgroundColor: "#BF41B7",
          height: 50,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={async () => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              navigation.navigate("Login");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </Pressable>
    </View>
  );
}
