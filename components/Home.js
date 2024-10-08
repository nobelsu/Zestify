import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation, useIsFocused, } from "@react-navigation/native";
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
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
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
} from "firebase/firestore";
import { NetworkContext } from "../exports";

const SCWIDTH = Dimensions.get("window").width;

export default function Home() {
  const navigation = useNavigation();
  const value = useContext(NetworkContext);
  const [dataNew, setDataNew] = useState([]);
  const [dataPromo, setDataPromo] = useState([]);
  const [focused, setFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [user, setUser] = useState(value.params.user);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshing2, setRefreshing2] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const onRefresh2 = useCallback(() => {
    setRefreshing2(true);
    setTimeout(() => {
      setRefreshing2(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const ref = collection(db, "stores");
    const qnew = query(ref, where("new", "==", true));
    const qpromo = query(ref, where("promo", "==", true));

    async function Temp() {
      onSnapshot(qnew, (querySnapshot) => {
        const dat = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDataNew(dat);
      });
      onSnapshot(qpromo, (querySnapshot) => {
        const dat = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDataPromo(dat);
      });
    }
    Temp();
  }, [refreshing, user]);

  useEffect(() => {
    const ref = collection(db, "stores");
    const qsearch = query(ref, where("name", "!=", ""));
    async function Temp() {
      onSnapshot(qsearch, (querySnapshot) => {
        const dat = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDataSearch(
          dat.filter((d) => {
            return d.name
              .toString()
              .toLowerCase()
              .includes(searchVal.toLowerCase());
          })
        );
      });
    }
    Temp();
  }, [searchVal, refreshing2]);

  function renderCard({ item }) {
    return (
      <View
        style={{
          height: 275,
          width: SCWIDTH * 0.9,
          marginLeft: SCWIDTH * 0.05,
          marginRight: SCWIDTH * 0.05,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Store", { user: user, store: item.id });
          }}
        >
          <ImageBackground
            source={{ uri: item.banner }}
            style={{
              width: SCWIDTH * 0.9,
              aspectRatio: 5,
            }}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.logo }}
              style={{
                width: SCWIDTH * 0.2,
                marginLeft: SCWIDTH * 0.03,
                marginTop: SCWIDTH * 0.03,
                aspectRatio: 1,
                borderRadius: 5000,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
          </ImageBackground>
          <Text
            style={{
              marginTop: SCWIDTH * 0.07,
              marginLeft: SCWIDTH * 0.03,
              marginRight: SCWIDTH * 0.03,
              marginBottom: 5,
              fontWeight: 400,
              fontSize: 14,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={{
              marginLeft: SCWIDTH * 0.03,
              marginRight: SCWIDTH * 0.03,
              fontWeight: 200,
              fontSize: 12,
              textAlign: "justify",
              marginBottom: 10,
            }}
            numberOfLines={4}
          >
            {item.desc}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "2%",
                  width: "90%",
                  marginLeft: SCWIDTH * 0.03,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={15}
                  style={{ color: "#BF41B7" }}
                />
                <Text
                  style={{
                    marginLeft: 3,
                    fontSize: 12,
                    marginTop: 0.2,
                    fontWeight: 200,
                    width: "95%",
                  }}
                  numberOfLines={2}
                >
                  {item.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: "2%",
                  width: "90%",
                  marginLeft: SCWIDTH * 0.03,
                }}
              >
                <Ionicons name="time" size={15} style={{ color: "#BF41B7" }} />
                <Text
                  style={{
                    marginLeft: 3,
                    fontSize: 12,
                    marginTop: 0.2,
                    fontWeight: 200,
                    width: "95%",
                  }}
                  numberOfLines={1}
                >
                  {item.collection}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: "grey",
                  marginLeft: 5,
                }}
              >
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: item.currency,
                }).format(item.oriprice)}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginTop: "1%",
                  marginLeft: 5,
                }}
              >
                {new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: item.currency,
                }).format(item.price)}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  function renderSmall({ item }) {
    return (
      <View
        style={{
          height: 280,
          width: SCWIDTH * 0.35,
          marginRight: SCWIDTH * 0.02,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Store", { user: user, store: item.id });
          }}
          style={{ alignItems: "center" }}
        >
          <ImageBackground
            source={{ uri: item.banner }}
            style={{
              width: SCWIDTH * 0.35,
              aspectRatio: 1.5,
            }}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.logo }}
              style={{
                width: SCWIDTH * 0.2,
                marginLeft: SCWIDTH * 0.075,
                marginTop: SCWIDTH * 0.125,
                aspectRatio: 1,
                borderRadius: 5000,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
          </ImageBackground>
          <Text
            style={{
              marginTop: SCWIDTH * 0.1,
              width: "90%",
              textAlign: "center",
              fontWeight: 400,
              fontSize: 14,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginTop: "4%",
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "grey",
            }}
          >
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: item.currency,
            }).format(item.oriprice)}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 700, marginTop: "1%" }}>
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: item.currency,
            }).format(item.price)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={15}
              style={{ color: "#BF41B7" }}
            />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {item.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
            }}
          >
            <Ionicons name="star" size={15} style={{ color: "#FDCC0D" }} />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {((item.rating * 5) / Math.max(1, item.revcnt)).toFixed(1)} |{" "}
              {item.qsold} sold
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
            }}
          >
            <Ionicons name="time" size={15} style={{ color: "#BF41B7" }} />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {item.collection}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  function render2List({ item }) {
    return (
      <View
        style={{
          height: 300,
          width: SCWIDTH * 0.425,
          marginTop: 10,
          backgroundColor: "white",
          borderRadius: 10,

          marginLeft: SCWIDTH * 0.05,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Store", { user: user, store: item.id });
          }}
          style={{ alignItems: "center" }}
        >
          <ImageBackground
            source={{ uri: item.banner }}
            style={{
              width: SCWIDTH * 0.425,
              aspectRatio: 1.6,
            }}
            imageStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.logo }}
              style={{
                width: SCWIDTH * 0.2,
                marginLeft: SCWIDTH * 0.1125,
                marginTop: SCWIDTH * 0.125,
                aspectRatio: 1,
                borderRadius: 5000,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
          </ImageBackground>
          <Text
            style={{
              marginTop: SCWIDTH * 0.1,
              width: "80%",
              textAlign: "center",
              fontWeight: 400,
              fontSize: 14,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: "4%",
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
              color: "grey",
            }}
          >
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: item.currency,
            }).format(item.oriprice)}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 700, marginTop: "1%" }}>
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: item.currency,
            }).format(item.price)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={15}
              style={{ color: "#BF41B7" }}
            />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {item.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
            }}
          >
            <Ionicons name="star" size={15} style={{ color: "#FDCC0D" }} />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {((item.rating * 5) / Math.max(1, item.revcnt)).toFixed(1)} |{" "}
              {item.qsold} sold
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: "2%",
              width: SCWIDTH * 0.35 * 0.8,
              justifyContent: "center",
            }}
          >
            <Ionicons name="time" size={15} style={{ color: "#BF41B7" }} />
            <Text
              style={{
                marginLeft: 3,
                color: "grey",
                fontSize: 12,
                marginTop: 0.2,
              }}
              numberOfLines={1}
            >
              {item.collection}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  function renderLong({ item }) {
    return (
      <View
        style={{
          height: 120,
          width: SCWIDTH * 0.9,
          marginLeft: SCWIDTH * 0.05,
          marginRight: SCWIDTH * 0.05,
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
              height: 120,
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
              marginLeft: SCWIDTH * 0.08,
              width: SCWIDTH * 0.32,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                width: "80%",
                fontWeight: 400,
                fontSize: 14,
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginBottom: "2%",
                width: SCWIDTH * 0.28,
                marginTop: 10,
              }}
            >
              <Ionicons
                name="location-sharp"
                size={15}
                style={{ color: "#BF41B7" }}
              />
              <Text
                style={{
                  marginLeft: 3,
                  color: "grey",
                  fontSize: 12,
                  marginTop: 0.2,
                }}
                numberOfLines={1}
              >
                {item.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: "2%",
                width: SCWIDTH * 0.28,
              }}
            >
              <Ionicons name="star" size={15} style={{ color: "#FDCC0D" }} />
              <Text
                style={{
                  marginLeft: 3,
                  color: "grey",
                  fontSize: 12,
                  marginTop: 0.2,
                }}
                numberOfLines={1}
              >
                {((item.rating * 5) / Math.max(1, item.revcnt)).toFixed(1)} |{" "}
                {item.qsold} sold
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: SCWIDTH * 0.28,
              }}
            >
              <Ionicons name="time" size={15} style={{ color: "#BF41B7" }} />
              <Text
                style={{
                  marginLeft: 3,
                  color: "grey",
                  fontSize: 12,
                  marginTop: 0.2,
                }}
                numberOfLines={1}
              >
                {item.collectionTime}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: SCWIDTH * 0.22,
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
                currency: item.currency,
              }).format(item.oriprice)}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 700, marginTop: "1%" }}>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: item.currency,
              }).format(item.price)}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

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
              setSearchVal("");
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
          value={searchVal}
          onChangeText={(text) => {
            setSearchVal(text);
          }}
          style={{
            width: SCWIDTH * 0.64,
            height: 30,
            marginLeft: 8,
            marginRight: 8,
            padding: 5,
            fontSize: 14,
          }}
          onFocus={() => {
            setFocused(true);
          }}
        />
      </View>
      {!focused ? (
        <ScrollView style={{ height: "100%" }} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "5%",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            Discover
          </Text>
          <Text
            style={{
              marginTop: "6%",
              fontSize: 20,
              fontWeight: 600,
              marginLeft: "5%",
            }}
          >
            What's new
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 200,
              marginLeft: "5%",
              marginTop: "1%",
            }}
          >
            Check out the latest deals!
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={SCWIDTH}
            decelerationRate={"fast"}
            data={dataNew}
            keyExtractor={(item) => item.id}
            style={{ marginTop: "3%" }}
            renderItem={renderCard}
          />
          {/* <Text
          style={{
            marginTop: "6%",
            fontSize: 20,
            fontWeight: 600,
            marginLeft: "5%",
          }}
        >
          Recommended
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 200,
            marginLeft: "5%",
            marginTop: "1%",
          }}
        >
          Based on your past activity!
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          style={{ marginLeft: "5%", marginTop: "3%" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  height: 250,
                  width: SCWIDTH * 0.35,
                  marginRight: SCWIDTH * 0.02,
                  backgroundColor: "white",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{ uri: item.url }}
                  style={{
                    width: SCWIDTH * 0.35,
                    aspectRatio: 1.5,
                  }}
                  imageStyle={{
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={{
                      width: SCWIDTH * 0.2,
                      marginLeft: SCWIDTH * 0.075,
                      marginTop: SCWIDTH * 0.125,
                      aspectRatio: 1,
                      borderRadius: 5000,
                      borderWidth: 2,
                      borderColor: "white",
                    }}
                  />
                </ImageBackground>
                <Text
                  style={{
                    marginTop: SCWIDTH * 0.1,
                    width: "80%",
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                  numberOfLines={1}
                >
                  {data[item.id].name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: "4%",
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: "grey",
                  }}
                >
                  ${data[item.id].oriprice}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: 700, marginTop: "1%" }}
                >
                  ${data[item.id].price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: "10%",
                    marginBottom: "1%",
                    width: SCWIDTH * 0.35 * 0.8,
                  }}
                >
                  <Ionicons
                    name="star"
                    size={15}
                    style={{ color: "#FDCC0D" }}
                  />
                  <Text
                    style={{
                      marginLeft: 3,
                      color: "#BF41B7",
                      fontSize: 12,
                      marginTop: 0.2,
                    }}
                    numberOfLines={1}
                  >
                    {data[item.id].rating * 5} |{" "}
                    <Text style={{ fontWeight: 700 }}>
                      {data[item.id].revcnt} sold
                    </Text>
                  </Text>
                </View>
              </View>
            );
          }}
        /> */}
          <Text
            style={{
              marginTop: "6%",
              fontSize: 20,
              fontWeight: 600,
              marginLeft: "5%",
            }}
          >
            Trending
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 200,
              marginLeft: "5%",
              marginTop: "1%",
            }}
          >
            What others are loving!
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataPromo}
            keyExtractor={(item) => item.id}
            style={{ marginLeft: "5%", marginTop: "3%", marginBottom: "10%" }}
            renderItem={renderSmall}
          />
          {/* <Text
            style={{
              marginTop: "6%",
              fontSize: 20,
              fontWeight: 600,
              marginLeft: "5%",
            }}
          >
            In your area
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 200,
              marginLeft: "5%",
              marginTop: "1%",
            }}
          >
            Support your local businesses!
          </Text>
          <FlatList
            data={dataNew}
            keyExtractor={(item) => item.id}
            style={{ marginTop: "3%", marginBottom: "10%" }}
            renderItem={renderLong}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={SCWIDTH}
            decelerationRate={"fast"}
          /> */}
        </ScrollView>
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "5%",
              fontSize: 20,
              fontWeight: 900,
              width: "90%",
              marginBottom: "2%",
            }}
            numberOfLines={1}
          >
            {searchVal == "" ? "All stores" : `Results for "${searchVal}"`}
          </Text>
          <FlatList
            style={{ width: "100%" }}
            numColumns={2}
            data={dataSearch}
            keyExtractor={(item) => item.id}
            renderItem={render2List}
            refreshControl={
              <RefreshControl refreshing={refreshing2} onRefresh={onRefresh2} />
            }
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    height: 100,
                    width: "100%",
                  }}
                ></View>
              );
            }}
          />
          <View style={{ height: 50, width: "100%" }}></View>
        </View>
      )}
    </View>
  );
}
