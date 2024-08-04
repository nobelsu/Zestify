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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Slider from "./Slider";
import { days, months } from "../exports";

const SCWIDTH = Dimensions.get("window").width;
const SCHEIGHT = Dimensions.get("window").height;

export default function Store2({ route }) {
  const navigation = useNavigation();
  const [numLines, setnumLines] = useState(3);
  const [textSee, settextSee] = useState("See more");
  const [data, setData] = useState({});
  const [vis, setVis] = useState(false);
  const [pur, setPur] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [marker, setMarker] = useState({ latitude: 0, longitude: 0 });
  const [tag, setTag] = useState(true);
  const timer = useRef(null);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", route.params.store);
      const docSnap = await getDoc(docRef);
      await setData({ ...docSnap.data(), id: route.params.store });
      setMarker({
        latitude: docSnap.data().loc.latitude,
        longitude: docSnap.data().loc.longitude,
      });
    }
    Temp();
  }, []);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      <Modal transparent={true} visible={vis} animationType="fade">
        <Pressable
          style={{
            height: SCHEIGHT - 480,
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
            height: 480,
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
              {data.collection}
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
              <Text>
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: !data.currency ? "IDR" : data.currency,
                }).format(Number(data.price) * pur)}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            <Slider
              height={50}
              width={SCWIDTH * 0.9}
              left="Today"
              right="Tomorrow"
              color="#BF41B7"
              tag={tag}
              setTag={setTag}
            />
          </View>

          <Pressable
            disabled={disabled}
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
            onPress={() => {
              setDisabled(true);
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Confirm</Text>
          </Pressable>
        </View>
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
                  fontSize: 20,
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
                  From {data.collection}
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
                flex: 1.8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: "grey",
                }}
              >
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: !data.currency ? "IDR" : data.currency,
                }).format(data.oriprice)}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: !data.currency ? "IDR" : data.currency,
                }).format(data.price)}
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
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "white",
                    marginLeft: 5,
                  }}
                >
                  {data.qsold} sold
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
            {data.desc && data.desc.length > 115 ? (
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
            ) : (
              <View></View>
            )}
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
                numberOfLines={numLines}
              >
                {data.ing}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 30,
                paddingBottom: 30,
                marginTop: 20,
                marginBottom: 20,
                borderTopWidth: 0.2,
                borderBottomWidth: 0.2,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  width: "100%",
                  fontWeight: 200,
                }}
              >
                <Text style={{ fontWeight: 700 }}>{data.revcnt}</Text> people
                rated this store...
              </Text>
              <View
                style={{
                  marginTop: 15,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Ionicons
                    name="star"
                    size={40}
                    style={{
                      color: "#FDCC0D",
                      marginTop: 10,
                      marginRight: 3,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 50,
                      fontWeight: 700,
                    }}
                  >
                    {((data.rating * 5) / Math.max(1, data.revcnt)).toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 4,
                paddingBottom: 20,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Location
              </Text>
              <MapView
                initialRegion={{
                  latitude:
                    marker["latitude"] != 0 ? marker["latitude"] : -6.1728,
                  longitude:
                    marker["longitude"] != 0 ? marker["longitude"] : 106.8272,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                style={{ height: 300, width: "100%", marginTop: 8 }}
              >
                {marker ? <Marker coordinate={marker} /> : <View />}
              </MapView>
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
            borderRadius: 10,
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
