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
import { createUserWithEmailAndPassword } from "firebase/auth";
const SCWIDTH = Dimensions.get("window").width;

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginLeft: "5%",
          // marginTop: "20%",
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          Register
        </Text>
        <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 200 }}>
          Have an account already?{" "}
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "red" }}>Login now!</Text>
          </Pressable>
        </Text>
        <View
          style={{
            height: 75,
            width: "100%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            EMAIL
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Ionicons
              name={"mail-outline"}
              size={18}
              style={{ color: "#400235", marginRight: 10, marginTop: 3 }}
            />
            <TextInput
              placeholder={"Type here..."}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              inputMode={"email"}
              autoCapitalize="none"
              autoComplete="off"
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "100%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            PASSWORD
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Ionicons
              name={"lock-closed-outline"}
              size={18}
              style={{ color: "#400235", marginRight: 10, marginTop: 3 }}
            />
            <TextInput
              placeholder={"Type here..."}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
      </View>

      <Pressable
        style={{
          width: "90%",
          marginLeft: "5%",
          height: 50,
          backgroundColor: "white",
          marginTop: "12%",
          borderRadius: 10,
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#BF41B7",
        }}
        onPress={async () => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <Text style={{ color: "#BF41B7", fontSize: 16, fontWeight: 500 }}>
          Register
        </Text>
      </Pressable>
    </View>
  );
}
