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

const data = [
  {
    id: 0,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
  },
  {
    id: 1,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
  },
  {
    id: 2,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
  },
  {
    id: 3,
    url: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    name: "Tous Les Jours Second Shop",
    price: "5.00",
    logo: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    oriprice: "15.00",
    rating: 0.9,
  },
];
const SCWIDTH = Dimensions.get("window").width;

export default function Home() {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView style={{ height: "100%" }}>
        <Text
          style={{
            marginLeft: "5%",
            marginTop: "18%",
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
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#BF41B7",
                    marginBottom: "1%",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  Rating:{" "}
                  <Text style={{ fontWeight: 900 }}>
                    {data[item.id].rating * 5}/5
                  </Text>
                </Text>
                <Progress.Bar
                  progress={data[item.id].rating}
                  width={SCWIDTH * 0.25}
                  color="#BF41B7"
                  height={8}
                />
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
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#BF41B7",
                    marginBottom: "1%",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  Rating:{" "}
                  <Text style={{ fontWeight: 900 }}>
                    {data[item.id].rating * 5}/5
                  </Text>
                </Text>
                <Progress.Bar
                  progress={data[item.id].rating}
                  width={SCWIDTH * 0.25}
                  color="#BF41B7"
                  height={8}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
