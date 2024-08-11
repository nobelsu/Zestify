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
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
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
import { db } from "../firebase";

const SCWIDTH = Dimensions.get("window").width;

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [codee, setCodee] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setEmailValid(true);
    setPassValid(true);
    setCodee("");
  }, []);

  function mctm(authCode) {
    switch (authCode) {
      case "auth/mising-password":
        return "Missing password!";

      case "auth/invalid-email":
        return "Invalid email!";

      case "auth/invalid-credential":
        return "Invalid credentials!";

      default:
        return "Error!";
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", response.user.uid.toString());
      console.log(response.user.uid.toString());
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      if (!docSnap.exists()) {
        navigation.navigate("TabNav2", {
          screen: "StoreSide",
          user: response.user.uid.toString(),
        });
      } else {
        if (docSnap.data().name == "") {
          navigation.navigate("Name", {
            user: response.user.uid.toString(),
          });
        } else {
          navigation.navigate("TabNav", {
            screen: "Home",
            user: response.user.uid.toString(),
          });
        }
      }
    } catch (e) {
      setCodee(mctm(e.code));
      if (e.code === "auth/invalid-email") setEmailValid(0);
      else setPassValid(0);
      throw e;
    }
  };

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
          Login
        </Text>
        <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 200 }}>
          Don't have an account yet?{" "}
          <Text
            style={{ color: "#BF41B7" }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Register now!
          </Text>
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
              textContentType="oneTimeCode"
              value={email}
              onChangeText={(text) =>
                setEmail(text.toLowerCase().split(" ").join("_"))
              }
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
        <View>
          {!emailValid ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                style={{ color: "red" }}
              />
              <Text
                style={{
                  color: "red",
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                {codee}
              </Text>
            </View>
          ) : (
            <View />
          )}
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
        <View>
          {!passValid ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                style={{ color: "red" }}
              />
              <Text
                style={{
                  color: "red",
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                {codee}
              </Text>
            </View>
          ) : (
            <View />
          )}
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
          setEmailValid(1);
          setPassValid(1);
          login(email, password);

          // signInWithEmailAndPassword(auth, email, password)
          //   .then((userCredential) => {
          //     const user = userCredential.user;
          //     async function Temp() {

          //     }
          //     Temp();
          //   })
          //   .catch((error) => {
          //     setCodee(codes[error.code]);
          //     if (codes[error.code].id > 1) setPassValid(0);
          //     else setEmailValid(0);
          //     throw error;
          //   });
        }}
      >
        <Text style={{ color: "#BF41B7", fontSize: 16, fontWeight: 500 }}>
          Login
        </Text>
      </Pressable>
      <View style={{alignItems: "center", marginTop: 30}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <View style={{width: "35%", borderWidth: 0.5, marginRight: "5%"}}></View>
          <Text style={{fontSize: 12, fontWeight: 200}}>OR</Text>
          <View style={{width: "35%", borderWidth: 0.5, marginLeft: "5%"}}></View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 14, fontWeight: 200}}>
            Continue{" "}
            <Text style={{color: "#BF41B7"}} onPress={() => {
              navigation.navigate("Home2");
            }}>anonymously...</Text>
          </Text>
        </View>
      </View>
      

    </View>
  );
}
