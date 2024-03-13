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

const SCWIDTH = Dimensions.get("window").width;
const SCHEIGHT = Dimensions.get("window").height;

export default function Store({ route }) {
  const navigation = useNavigation();
  const [hearted, setHearted] = useState(false); // adjust based on data stored
  const [numLines, setnumLines] = useState(3);
  const [textSee, settextSee] = useState("See more");
  const [data, setData] = useState({});
  const [vis, setVis] = useState(false);
  const [vis2, setVis2] = useState(false);
  const [pur, setPur] = useState(1);
  const [val, setVal] = useState("");
  const timer = useRef(null);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", route.params.store);
      const userRef = doc(db, "users", route.params.user);
      const docSnap = await getDoc(docRef);
      await setData({ ...docSnap.data(), id: route.params.store });
      const userSnap = await getDoc(userRef);
      await setHearted(userSnap.data().fav.includes(route.params.store));
      setVal(userSnap.data().name);
    }
    Temp();
  }, []);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
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
            {data.name}
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
              {data.collectionTime}
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
                disabled={pur >= data.stock}
                style={{
                  width: 32,
                  height: 32,
                  borderWidth: 1,
                  borderColor: pur >= data.stock ? "#e9e9e9" : "#BF41B7",
                  backgroundColor: pur >= data.stock ? "#e9e9e9" : "white",
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
                  style={{ color: pur >= data.stock ? "white" : "#BF41B7" }}
                />
              </Pressable>
            </View>
          </View>
          <View style={{ width: "90%", flexDirection: "row", marginTop: 15 }}>
            <View style={{ flex: 1 }}>
              <Text>Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text>${(data.price * pur).toFixed(2)}</Text>
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
              const storeRef = doc(db, "stores", route.params.store);
              const storeSnap = await getDoc(storeRef);
              const userRef = doc(db, "users", route.params.user);
              const userSnap = await getDoc(userRef);
              if (storeSnap.data().stock < pur) {
                setPur(1);
                setVis(false);
                setVis2(true);
                return;
              }
              const docRef = await addDoc(collection(db, "orders"), {
                quantity: pur,
                store: route.params.store,
                storeName: storeSnap.data().name,
                user: route.params.user,
                status: 0,
                price: data.price * pur,
              });
              await updateDoc(storeRef, {
                stock: storeSnap.data().stock - pur,
                orders: [...storeSnap.data().orders, docRef.id],
              });
              await updateDoc(userRef, {
                orders: [...userSnap.data().orders, docRef.id],
              });

              navigation.navigate("Reserve", {
                ...data,
                pur: pur,
                user: route.params.user,
                orderID: docRef.id,
                username: val,
                price: data.price,
              });
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
      <ScrollView style={{ flex: 3.5 }}>
        <View style={{ height: 240 }}>
          <ImageBackground
            source={{
              uri: data.banner,
            }}
            style={{ height: "100%", width: "100%" }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  width: "100%",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      color="white"
                      size={36}
                      style={{
                        marginTop: "30%",
                        marginLeft: "10%",
                      }}
                    />
                  </Pressable>
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Pressable
                    onPress={async () => {
                      setHearted(!hearted);
                      const ref = doc(db, "users", route.params.user);
                      const snap = await getDoc(ref);
                      const ori = snap.data()["fav"];
                      if (hearted)
                        ori.splice(ori.indexOf(route.params.store), 1);
                      else ori.push(route.params.store);
                      await updateDoc(ref, { fav: ori });
                    }}
                  >
                    <Ionicons
                      name={hearted ? "heart" : "heart-outline"}
                      color={hearted ? "#BF41B7" : "white"}
                      size={36}
                      style={{
                        marginLeft: "70%",
                        marginTop: "30%",
                        width: 48,
                        height: 48,
                      }}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={{ flexDirection: "row", width: "100%", flex: 0.8 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Image
                    source={{
                      uri: data.logo,
                    }}
                    style={{
                      width: "26%",
                      aspectRatio: 1,
                      borderRadius: 5000,
                      marginLeft: "5%",
                      borderWidth: 2,
                      borderColor: "#BF41B7",
                      marginTop: "12%",
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View>
          <View style={{ flexDirection: "row", marginTop: "4.5%" }}>
            <View style={{ flex: 2.5, paddingRight: 15 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  marginLeft: "5%",
                  marginTop: "5%",
                  marginRight: "5%",
                  flex: 2,
                }}
              >
                {data.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingLeft: "5%",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <Ionicons
                  name="time-outline"
                  size={20}
                  style={{ marginRight: "1%", color: "#BF41B7" }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 1,
                    fontWeight: 300,
                    width: "90%",
                  }}
                >
                  From {data.collectionStart} until {data.collectionEnd}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 5,
                  paddingLeft: "5%",
                  width: "100%",
                  backgroundColor: "white",
                  paddingBottom: 8,
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  style={{ marginRight: "1%", color: "#BF41B7" }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 1,
                    fontWeight: 300,
                    width: "90%",
                    paddingBottom: 4,
                  }}
                >
                  {data.address}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: "grey",
                }}
              >
                ${data.oriprice}
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 700 }}>
                ${data.price}
              </Text>
              <View
                style={{
                  width: "80%",
                  marginTop: 10,
                  backgroundColor: "#177359",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5000,
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "white",
                  }}
                  numberOfLines={1}
                >
                  {data.stock} left
                </Text>
              </View>
              <View
                style={{
                  width: "80%",
                  marginTop: 5,
                  backgroundColor: "#177359",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5000,
                  padding: 5,
                  flexDirection: "row",
                }}
              >
                <Ionicons name="star" size={15} style={{ color: "#FDCC0D" }} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "white",
                    marginLeft: 5,
                  }}
                >
                  {data.rating * 5}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              marginTop: 8,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 700 }}>
                What to expect
              </Text>
              <Text
                style={{
                  textAlign: "justify",
                  marginTop: 8,
                  fontWeight: 200,
                }}
                numberOfLines={numLines}
              >
                {data.desc}
              </Text>
            </View>
            <View style={{ marginTop: 3 }}>
              <Pressable
                onPress={() => {
                  numLines == 3 ? setnumLines(100) : setnumLines(3);
                  textSee == "See more"
                    ? settextSee("See less")
                    : settextSee("See more");
                }}
              >
                <Text style={{ fontWeight: 600, color: "#BF41B7" }}>
                  {textSee}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 4,
                paddingBottom: 4,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Ingredients & Allergens
              </Text>
              <Text
                style={{
                  textAlign: "justify",
                  marginTop: 8,
                  fontWeight: 200,
                }}
              >
                {data.ing}
              </Text>

              {/* <Text
                style={{
                  textAlign: "justify",
                  marginTop: 8,
                  fontWeight: 200,
                }}
              >
                Flour, eggs, sugar
              </Text> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "white",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          paddingTop: "3%",
        }}
      >
        {/* <Pressable
          style={{
            width: "45%",
            backgroundColor: "white",
            borderColor: "#BF41B7",
            borderWidth: 2,
            height: "50%",
            marginRight: "2%",
            borderRadius: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#BF41B7", fontSize: 14 }}>Reserve</Text>
        </Pressable> */}
        <Pressable
          style={{
            width: "90%",
            backgroundColor: "#BF41B7",
            height: "50%",
            marginLeft: "2%",
            borderRadius: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVis(true);
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Reserve</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
