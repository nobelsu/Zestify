import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useContext, useEffect, useRef } from "react";
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
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { NetworkContext } from "../exports";

const SCWIDTH = Dimensions.get("window").width;
const SCHEIGHT = Dimensions.get("window").height;

export default function Favourites() {
  const [data, setData] = useState({});
  const [changed, setChanged] = useState(0);
  const [val, setVal] = useState("");
  const [purchData, setPurchData] = useState({});
  const [vis, setVis] = useState(false);
  const [vis2, setVis2] = useState(false);
  const [pur, setPur] = useState(1);
  const value = useContext(NetworkContext);
  const user = value.params.user;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [focused, setFocused] = useState(false);
  const [valoo, setValoo] = useState("");
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      const ref = collection(db, "stores");

      const q = query(ref, where("name", "!=", ""));
      onSnapshot(q, (querySnapshot) => {
        const dat = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setValoo(docSnap.data().name);
        setData(
          dat.filter((d) => {
            return (
              docSnap.data().fav.includes(d.id) &&
              d.name.toString().toLowerCase().includes(val.toLowerCase())
            );
          })
        );
      });
    }
    Temp();
  }, [changed, isFocused, val]);
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Modal transparent={true} visible={vis} animationType="fade">
        <Pressable
          style={{
            height: SCHEIGHT - 370,
            width: "100%",
            justifyContent: "flex-end",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
          }}
          onPress={() => {
            setVis(false);
            setPur(1);
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: 370,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: 800,
              fontSize: 20,
              textAlign: "center",
              width: "90%",
            }}
            numberOfLines={1}
          >
            {purchData.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              marginTop: 10,
            }}
          >
            <Ionicons name="time" size={20} style={{ color: "#BF41B7" }} />
            <Text
              style={{
                marginLeft: 3,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {purchData.collectionStart} - {purchData.collectionEnd}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              width: "90%",
              borderTopWidth: 0.2,
              borderBottomWidth: 0.2,
              paddingTop: 15,
              paddingBottom: 5,
            }}
          >
            <Text>Select quantity...</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                disabled={pur == 1}
                style={{
                  width: 32,
                  height: 32,
                  borderWidth: 1,
                  borderColor: pur == 1 ? "#e9e9e9" : "#BF41B7",
                  backgroundColor: pur == 1 ? "#e9e9e9" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                }}
                onPress={() => {
                  setPur(pur - 1);
                }}
              >
                <Ionicons
                  name="remove-outline"
                  size={15}
                  style={{ color: pur == 1 ? "white" : "#BF41B7" }}
                />
              </Pressable>
              <Text
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  fontSize: 50,
                  fontWeight: 900,
                }}
              >
                {pur}
              </Text>
              <Pressable
                disabled={pur >= purchData.stock}
                style={{
                  width: 32,
                  height: 32,
                  borderWidth: 1,
                  borderColor: pur >= purchData.stock ? "#e9e9e9" : "#BF41B7",
                  backgroundColor: pur >= purchData.stock ? "#e9e9e9" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                }}
                onPress={() => {
                  setPur(pur + 1);
                }}
              >
                <Ionicons
                  name="add-outline"
                  size={15}
                  style={{
                    color: pur >= purchData.stock ? "white" : "#BF41B7",
                  }}
                />
              </Pressable>
            </View>
          </View>
          <View style={{ width: "90%", flexDirection: "row", marginTop: 15 }}>
            <View style={{ flex: 1 }}>
              <Text>Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text>${(purchData.price * pur).toFixed(2)}</Text>
            </View>
          </View>
          <Pressable
            style={{
              width: "90%",
              backgroundColor: "#BF41B7",
              height: 40,
              marginLeft: "2%",
              borderRadius: "10%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
              marginBottom: 10,
            }}
            onPress={async () => {
              const storeRef = doc(db, "stores", purchData.id);
              const userRef = doc(db, "users", user);
              const storeSnap = await getDoc(storeRef);
              const userSnap = await getDoc(userRef);
              if (storeSnap.data().stock < pur) {
                setPur(1);
                setVis(false);
                setVis2(true);
                return;
              }
              const docRef = await addDoc(collection(db, "orders"), {
                quantity: pur,
                store: purchData.id,
                user: user,
                status: 0,
                storeName: storeSnap.data().name,
              });
              await updateDoc(storeRef, {
                stock: storeSnap.data().stock - pur,
                orders: [...storeSnap.data().orders, docRef.id],
              });
              await updateDoc(userRef, {
                orders: [...userSnap.data().orders, docRef.id],
              });
              navigation.navigate("Reserve", {
                ...purchData,
                pur: pur,
                user: user,
                orderID: docRef.id,
                username: valoo,
              });
              setPur(1);
              setVis(false);
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Confirm</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal transparent={true} visible={vis2} animationType="fade">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVis2(false);
          }}
        >
          <View
            style={{
              height: 240,
              width: 280,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <Ionicons color={"#BF41B7"} name="alert-circle-outline" size={80} />
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 600,
                fontSize: 16,
                width: "90%",
                textAlign: "center",
              }}
            >
              Reserve failed
            </Text>
            <Text style={{ width: "90%", textAlign: "center" }}>
              The store's stock has updated. Reload the page to view the
              changes!
            </Text>
          </View>
        </Pressable>
      </Modal>
      <View
        style={{
          width: "90%",
          marginLeft: "5%",
          height: 50,
          marginTop: "15%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 20,
          marginBottom: "3%",
        }}
      >
        <Pressable
          onPress={() => {
            if (focused) {
              setVal("");
              setFocused(!focused);
              Keyboard.dismiss();
            }
            return;
          }}
        >
          <Ionicons
            name={focused ? "close-outline" : "search-outline"}
            size={22}
          />
        </Pressable>
        <TextInput
          placeholder="Search..."
          style={{
            width: SCWIDTH * 0.64,
            height: 30,
            marginLeft: 8,
            marginRight: 8,
            padding: 5,
            fontSize: 14,
          }}
          value={val}
          onChangeText={(text) => {
            setVal(text);
          }}
          onFocus={() => {
            setFocused(true);
          }}
        />
        <Pressable>
          <Ionicons name="options-outline" size={25} />
        </Pressable>
      </View>
      <Text
        style={{
          marginLeft: "5%",
          marginTop: "5%",
          marginBottom: "2%",
          fontSize: 30,
          fontWeight: 900,
        }}
      >
        Favourites
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: 110,
                width: SCWIDTH * 0.9,
                marginLeft: SCWIDTH * 0.05,
                backgroundColor: "white",
                marginTop: 10,
                borderRadius: 10,

                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("Store", { user: user, store: item.id });
                }}
                style={{ flexDirection: "row" }}
              >
                <ImageBackground
                  style={{
                    height: 110,
                    width: SCWIDTH * 0.28,
                    justifyContent: "center",
                  }}
                  imageStyle={{
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  source={{ uri: item.banner }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={{
                      width: SCWIDTH * 0.2,
                      marginLeft: SCWIDTH * 0.15,
                      aspectRatio: 1,
                      borderRadius: 5000,
                      borderWidth: 2,
                      borderColor: "white",
                    }}
                  />
                </ImageBackground>
                <View
                  style={{
                    marginLeft: SCWIDTH * 0.09,
                    width: SCWIDTH * 0.5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: 600 }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 8 }}>
                    <Pressable
                      onPress={async () => {
                        const ref = doc(db, "users", user);
                        const snap = await getDoc(ref);
                        const ori = snap.data()["fav"];
                        ori.splice(ori.indexOf(item.id), 1);
                        await updateDoc(ref, { fav: ori });
                        setChanged(!changed);
                      }}
                    >
                      <Ionicons name="heart" color="#BF41B7" size={28} />
                    </Pressable>
                    <Pressable
                      style={{
                        width: "75%",
                        backgroundColor: "white",
                        marginLeft: "5%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#BF41B7",
                      }}
                      onPress={() => {
                        setPurchData(item);
                        setVis(true);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#BF41B7",
                        }}
                      >
                        Quick order +
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </View>

            // <View
            //   style={{
            //     marginTop: 10,
            //     height: SCWIDTH * 0.26,
            //     width: SCWIDTH * 0.9,
            //     marginLeft: SCWIDTH * 0.05,
            //     marginRight: SCWIDTH * 0.05,
            //     backgroundColor: "white",
            //     borderRadius: 10,
            //     flexDirection: "row",
            //   }}
            // >
            //   <Image
            //     source={{ uri: item.logo }}
            //     style={{
            //       width: SCWIDTH * 0.2,
            //       marginLeft: SCWIDTH * 0.03,
            //       marginTop: SCWIDTH * 0.03,
            //       aspectRatio: 1,
            //       borderRadius: 5000,
            //       borderWidth: 2,
            //       borderColor: "white",
            //     }}
            //   />
            //   <Text>{item.name}</Text>
            // </View>
          );
        }}
      />
    </View>
  );
}
