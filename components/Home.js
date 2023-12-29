import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const data = [
  {
    id: 0,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
    revcnt: 169,
    desc: "With a commitment to using only the finest ingredients, our products are known for their unique flavors and wholesomequalities. Our skilled bakers create a wide array of delicioustreats that are freshly baked and ready to be enjoyed by our customers seeking exceptional taste and quality.",
  },
  {
    id: 1,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
    revcnt: 169,
    desc: "With a commitment to using only the finest ingredients, our products are known for their unique flavors and wholesomequalities. Our skilled bakers create a wide array of delicioustreats that are freshly baked and ready to be enjoyed by our customers seeking exceptional taste and quality.",
  },
  {
    id: 2,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
    revcnt: 169,
    desc: "With a commitment to using only the finest ingredients, our products are known for their unique flavors and wholesomequalities. Our skilled bakers create a wide array of delicioustreats that are freshly baked and ready to be enjoyed by our customers seeking exceptional taste and quality.",
  },
  {
    id: 3,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
    revcnt: 200000000,
    desc: "With a commitment to using only the finest ingredients, our products are known for their unique flavors and wholesomequalities. Our skilled bakers create a wide array of delicioustreats that are freshly baked and ready to be enjoyed by our customers seeking exceptional taste and quality.",
  },
];
const SCWIDTH = Dimensions.get("window").width;

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          width: "95%",
          marginLeft: "2.5%",
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
        <Ionicons name="search-outline" size={22} />
        <TextInput
          placeholder="Search..."
          style={{
            width: SCWIDTH * 0.7,
            height: 30,
            marginLeft: 8,
            marginRight: 8,
            padding: 5,
            fontSize: 14,
          }}
        />
        <Pressable>
          <Ionicons name="options-outline" size={25} />
        </Pressable>
      </View>
      <ScrollView style={{ height: "100%" }}>
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
          data={data}
          keyExtractor={(item) => item.id}
          style={{ marginTop: "3%" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  height: 200,
                  width: SCWIDTH * 0.9,
                  marginLeft: SCWIDTH * 0.05,
                  marginRight: SCWIDTH * 0.05,
                  backgroundColor: "white",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{ uri: item.url }}
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
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        marginTop: SCWIDTH * 0.07,
                        marginLeft: SCWIDTH * 0.03,
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                      numberOfLines={1}
                    >
                      {data[item.id].name}
                    </Text>
                    <Text
                      style={{
                        marginLeft: SCWIDTH * 0.03,
                        fontWeight: 200,
                        fontSize: 12,
                        textAlign: "justify",
                      }}
                      numberOfLines={3}
                    >
                      {data[item.id].desc}
                    </Text>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Store");
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: SCWIDTH * 0.03,
                          fontWeight: 900,
                          fontSize: 12,
                          color: "#BF41B7",
                          marginTop: 10,
                        }}
                      >
                        See more
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        color: "grey",
                        marginLeft: 30,
                        marginTop: 28,
                      }}
                    >
                      ${data[item.id].oriprice}
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        marginTop: "1%",
                        marginLeft: 30,
                      }}
                    >
                      ${data[item.id].price}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <Text
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
        />
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
        />
        <Text
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
        />
      </ScrollView>
    </View>
  );
}
4;
