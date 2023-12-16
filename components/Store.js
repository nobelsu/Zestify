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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Store() {
  const [hearted, setHearted] = useState(false); // adjust based on data stored

  function heartStatus() {
    setHearted(!hearted);
    console.log(hearted);
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={{ flex: 5, backgroundColor: "white" }}>
        <ImageBackground
          source={require("/assets/sampleBanner.jpg")} // replace with banner
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <View style={{ flex: 1 }}>
              <Pressable>
                <Ionicons
                  name="arrow-back-outline"
                  color="white"
                  size={36}
                  style={{
                    marginTop: "10%",
                    marginLeft: "10%",
                  }}
                />
              </Pressable>
            </View>
            <View style={{ flex: 1 }}>
              <Pressable onPress={heartStatus}>
                {!hearted && (
                  <Ionicons
                    name="heart-outline"
                    color="white"
                    size={36}
                    style={{
                      marginLeft: "70%",
                      marginTop: "10%",
                    }}
                  />
                )}
                {hearted && (
                  <Ionicons
                    name="heart"
                    color="white"
                    size={36}
                    style={{
                      marginLeft: "70%",
                      marginTop: "10%",
                    }}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ flex: 14, backgroundColor: "white" }}>
        <View>
          <View></View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: "80%",
  },
  header: {},
});
