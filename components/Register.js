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
import { GeoPoint, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
import SelectDropdown from "react-native-select-dropdown";
const SCWIDTH = Dimensions.get("window").width;
import { Dropdown } from "react-native-element-dropdown";

const codes = {
  "auth/email-already-in-use": {
    id: 1,
    msg: "Email already taken!",
  },
  "auth/invalid-email": {
    id: 2,
    msg: "Invalid email!",
  },
  "auth/missing-email": {
    id: 3,
    msg: "Missing email!",
  },
  "auth/weak-password": {
    id: 4,
    msg: "Password must have at least 6 characters!",
  },
  "auth/missing-password": {
    id: 5,
    msg: "Missing password!",
  },
};

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [codee, setCodee] = useState("");
  const [typee, setTypee] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
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
          <Text
            style={{ color: "#BF41B7" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login now!
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
              textContentType="oneTimeCode"
              placeholder={"Type here..."}
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
            ACCOUNT TYPE
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Dropdown
              style={{
                width: SCWIDTH * 0.9 - 30,
                height: 25,
              }}
              data={[
                { label: "Customer", value: 0 },
                { label: "Store", value: 1 },
              ]}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={typee}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setTypee(item.value);
                setIsFocus(false);
              }}
              selectedTextStyle={{ fontSize: 14 }}
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
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                  const user = userCredential.user;
                  if (typee) {
                    setDoc(doc(db, "stores", user.uid), {
                      awards: [],
                      banner: "https://placehold.co/1920x1080/png",
                      collection: "Start Time - End Time",
                      desc: "This is a description of my store.",
                      ing: "Avocado, Banana, Carrot",
                      loc: new GeoPoint(-6.1728, 106.8272),
                      logo: "https://placehold.co/1080x1080/png",
                      name: "My store",
                      new: true,
                      orders: [],
                      oriprice: "Rp. 99,999",
                      price: "Rp. 9,999",
                      promo: false,
                      rating: 0,
                      revcnt: 0,
                      reviews: [],
                      stock: 0,
                      tags: [],
                      today: true,
                      tomorrow: false,
                      address: "My address",
                      qsold: 0,
                      email: email,
                    });
                    navigation.navigate("TabNav2", {
                      screen: "Store",
                      user: user.uid,
                    });
                  } else {
                    setDoc(doc(db, "users", user.uid), {
                      orders: [],
                      fav: [],
                      name: "",
                      type: typee,
                      email: email,
                    });
                    navigation.navigate("Name", { user: user.uid });
                  }
                }
              );
            })
            .catch((error) => {
              setCodee(codes[error.code].msg);
              if (codes[error.code].id > 3) setPassValid(0);
              else setEmailValid(0);
            });
        }}
      >
        <Text style={{ color: "#BF41B7", fontSize: 16, fontWeight: 500 }}>
          Register
        </Text>
      </Pressable>
    </View>
  );
}
