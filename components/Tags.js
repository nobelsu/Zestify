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
  return (
    <View
      style={{
        backgroundColor: "#30D9BA",
        width: SCWIDTH * 0.25,
        marginRight: SCWIDTH * 0.03,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5000,
      }}
    >
      <Text
        style={{
          flexWrap: "wrap",
          color: "black",
          fontWeight: 200,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
}
