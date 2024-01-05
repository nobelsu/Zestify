import { useNavigation } from "@react-navigation/native";
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
  SectionList,
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
} from "firebase/firestore";

export default function Store({ route }) {
  const navigation = useNavigation();
  const [hearted, setHearted] = useState(false); // adjust based on data stored
  const [numLines, setnumLines] = useState(3);
  const [textSee, settextSee] = useState("See more");
  const [data, setData] = useState({});
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", route.params.store);
      const userRef = doc(db, "users", route.params.user);
      const docSnap = await getDoc(docRef);
      await setData({ ...docSnap.data(), id: route.params.store });
      const userSnap = await getDoc(userRef);
      await setHearted(userSnap.data().fav.includes(route.params.store));
    }
    Temp();
  }, []);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
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
                  {data.loc}
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
                  backgroundColor: "#BF41B7",
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
                  backgroundColor: "#BF41B7",
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
              <FlatList
                style={{ paddingTop: 4, paddingBottom: 4, marginTop: 8 }}
                keyExtractor={(item) => item}
                data={data.ing}
                renderItem={({ item }) => <Tag text={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />

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
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 4,
                paddingBottom: 4,
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Highlights
              </Text>
              <Badge id={0} />
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
        <Pressable
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
        </Pressable>
        <Pressable
          style={{
            width: "45%",
            backgroundColor: "#BF41B7",
            height: "50%",
            marginLeft: "2%",
            borderRadius: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
