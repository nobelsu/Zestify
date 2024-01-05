import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useContext, useEffect } from "react";
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
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { NetworkContext } from "../exports";

const SCWIDTH = Dimensions.get("window").width;

export default function Favourites() {
  const [data, setData] = useState({});
  const [changed, setChanged] = useState(0);
  const [val, setVal] = useState("");
  const value = useContext(NetworkContext);
  const user = value.params.user;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [focused, setFocused] = useState(false);
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
                height: SCWIDTH * 0.26,
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
                    height: SCWIDTH * 0.26,
                    width: SCWIDTH * 0.28,
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
                      marginTop: SCWIDTH * 0.03,
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
