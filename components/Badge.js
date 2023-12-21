import { useNavigation } from "@react-navigation/native";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const data = [
  {
    color: "#f77234",
    description: "1000 tons saved!",
    icon: "https://www.freepnglogos.com/uploads/trophy-png/1-trophy-icon-30.png",
  },
  {},
];

export default function Badge(props) {
  return (
    <View
      style={{
        width: 160,
        height: 220,
        backgroundColor: data[props.id].color,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        shadowRadius: 10,
        shadowOpacity: 0.7,
      }}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
          borderRadius: 65,
        }}
      >
        <Image
          source={{ uri: data[props.id].icon }}
          style={{
            height: 100,
            aspectRatio: 1,
          }}
        />
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: 900,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          textAlign: "center",
        }}
      >
        {data[props.id].description}
      </Text>
    </View>
  );
}
