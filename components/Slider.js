import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
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
  SectionList,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import Badge from "./Badge";
import { db } from "../firebase";
import Tag from "./Tags";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function Slider(props) {
  return (
    <View
      style={{
        height: props.height,
        width: props.width,
        flexDirection: "row",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: props.color,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: props.tag ? props.color : "white",
          borderBottomLeftRadius: 18,
          borderTopLeftRadius: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          props.setTag(true);
        }}
      >
        <Text style={{ color: props.tag ? "white" : props.color }}>
          {props.left}
        </Text>
      </Pressable>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: props.tag ? "white" : props.color,
          borderBottomRightRadius: 18,
          borderTopRightRadius: 18,

          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          props.setTag(false);
        }}
      >
        <Text style={{ color: props.tag ? props.color : "white" }}>
          {props.right}
        </Text>
      </Pressable>
    </View>
  );
}
