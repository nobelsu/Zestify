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

export default function StoreSide() {
  const [name, setName] = useState("");
  const SCWIDTH = Dimensions.get("window").width;
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ScrollView>
        <Text
          style={{
            marginLeft: "5%",
            marginTop: "23%",
            fontSize: 30,
            fontWeight: 900,
          }}
        >
          My store
        </Text>
        <View></View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            NAME
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Ionicons
              name={"lock-closed-outline"}
              size={18}
              style={{ color: "#400235", marginRight: 10, marginTop: 3 }}
            />
            <TextInput
              placeholder={"Type here..."}
              value={name}
              onChangeText={(text) => setName(text)}
              secureTextEntry={true}
              autoCapitalize="none"
              autoComplete="off"
              editable
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30 - 30,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
