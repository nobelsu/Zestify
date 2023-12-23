import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SCWIDTH = Dimensions.get("window").width;

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            height: SCWIDTH * 1.2,
            width: SCWIDTH * 1.2,
            backgroundColor: "black",
            borderRadius: "1500",
            marginLeft: -SCWIDTH * 0.5,
            marginTop: -SCWIDTH * 0.5,
          }}
        >
          <Text
            style={{
              marginTop: SCWIDTH * 0.95,
              marginLeft: SCWIDTH * 0.55,
              fontSize: 30,
              fontWeight: 900,
              color: "white",
            }}
          >
            LOGIN
          </Text>
        </View>
        <View
          style={{
            height: SCWIDTH * 0.7,
            width: SCWIDTH * 0.7,
            backgroundColor: "red",
            borderRadius: "1500",
            marginLeft: -SCWIDTH * 0.2,
            marginTop: -SCWIDTH * 0.2,
            // marginLeft: -SCWIDTH * 0.5,
            // marginTop: -SCWIDTH * 0.5,
          }}
        ></View>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{
          height: "5%",
          width: "90%",
          marginLeft: "5%",
          borderWidth: 1,
          marginTop: "20%",
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={{
          height: "5%",
          width: "90%",
          marginLeft: "5%",
          borderWidth: 1,
        }}
      />
      <Pressable
        style={{
          width: "90%",
          marginLeft: "5%",
          height: "10%",
          backgroundColor: "red",
        }}
        onPress={async () => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("dahh");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
