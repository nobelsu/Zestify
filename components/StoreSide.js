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
  const value = useContext(NetworkContext);
  const user = value.params.user;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [otime, setOtime] = useState("");
  const [etime, setEtime] = useState("");
  const [stock, setStock] = useState(0);
  const [edit, setEdit] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", user);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
      setDesc(docSnap.data().desc);
      setLoc(docSnap.data().loc);
      setOtime(docSnap.data().collectionStart);
      setEtime(docSnap.data().collectionEnd);
      setStock(docSnap.data().stock);
    }
    Temp();
  }, []);

  const SCWIDTH = Dimensions.get("window").width;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={50}
    >
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
            <TextInput
              placeholder={"Type here..."}
              value={name}
              onChangeText={(text) => setName(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 250,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            DESCRIPTION
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              textAlign="top"
              value={desc}
              onChangeText={(text) => setDesc(text)}
              autoComplete="off"
              multiline={true}
              editable={edit}
              style={{
                color: "#400235",
                height: 200,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
                textAlignVertical: "top",
              }}
            />
          </View>
        </View>
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
            LOCATION
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={loc}
              onChangeText={(text) => setLoc(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
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
            COLLECTION START
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={otime}
              onChangeText={(text) => setOtime(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
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
            COLLECTION END
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={etime}
              onChangeText={(text) => setEtime(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
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
            STOCK
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={stock}
              keyboardType="numeric"
              onChangeText={(text) => setStock(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        {!edit ? (
          <Pressable
            style={{
              width: "90%",
              backgroundColor: "#BF41B7",
              height: 50,
              marginLeft: "5%",
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setEdit(true);
            }}
          >
            <Text style={{ color: "white" }}>Edit</Text>
          </Pressable>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{
                width: "42.5%",
                borderColor: "#BF41B7",
                height: 50,
                marginLeft: "5%",
                borderRadius: 15,
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
              }}
              onPress={() => {
                setEdit(false);
              }}
            >
              <Text style={{ color: "#BF41B7" }}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{
                width: "42.5%",
                backgroundColor: "#BF41B7",
                height: 50,
                marginLeft: "5%",
                borderRadius: 15,
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                const docRef = doc(db, "stores", user);
                await updateDoc(docRef, {
                  name: name,
                  desc: desc,
                  loc: loc,
                  collectionStart: otime,
                  collectionEnd: etime,
                  stock: stock,
                });
                setPressed(!pressed);
                setEdit(false);
              }}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
