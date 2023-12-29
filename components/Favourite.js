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

const SCWIDTH = Dimensions.get("window").width;

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

export default function Favourite() {
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginTop: 10,
                height: SCWIDTH * 0.26,
                width: SCWIDTH * 0.9,
                marginLeft: SCWIDTH * 0.05,
                marginRight: SCWIDTH * 0.05,
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
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
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
