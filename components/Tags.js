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
import rgbToHsl from "../exports";

const SCWIDTH = Dimensions.get("window").width;

export default function Tag(props) {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const val = rgbToHsl(red, green, blue);
  useEffect(() => {}, []);
  return (
    <View
      style={{
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        width: SCWIDTH * 0.25,
        marginRight: SCWIDTH * 0.03,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 13,
      }}
    >
      <Text
        style={{
          flexWrap: "wrap",
          color: val >= 130 ? "black" : "white",
          fontSize: 14,
          fontWeight: 200,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
}
