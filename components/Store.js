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
import Badge from "./Badge";

export default function Store() {
  const [hearted, setHearted] = useState(false); // adjust based on data stored

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      <ScrollView style={{ flex: 3.5 }}>
        <View style={{ height: "25%" }}>
          <ImageBackground
            source={{
              uri: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
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
                  <Ionicons
                    name="arrow-back-outline"
                    color="white"
                    size={36}
                    style={{
                      marginTop: "30%",
                      marginLeft: "10%",
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
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
                    onPress={() => {
                      setHearted(!hearted);
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", width: "100%", flex: 0.8 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Image
                    source={{
                      uri: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
                    }}
                    style={{
                      width: "55%",
                      aspectRatio: 1,
                      borderRadius: 5000,
                      marginLeft: "15%",
                      borderWidth: 2,
                      borderColor: "#BF41B7",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1.6,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      marginBottom: "2%",
                      fontWeight: 500,
                      width: 200,
                    }}
                  >
                    Rating: 4.5/5
                  </Text>
                  <Progress.Bar
                    progress={0.9}
                    width={200}
                    color="#BF41B7"
                    height={10}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 900,
              marginLeft: "5%",
              marginTop: "5%",
              marginRight: "5%",
            }}
          >
            TOUS les JOURS
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "20%",
                backgroundColor: "#30D9BA",
                padding: "1%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                marginLeft: "5%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                }}
              >
                3 left
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                backgroundColor: "#177359",
                padding: "1%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                marginLeft: "2%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                }}
              >
                $4.99
              </Text>
            </View>
          </View>
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
              Today 15:00-17:00
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
              53 South Carriage Dr. Tuscaloosa, AL 35405
            </Text>
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
              >
                With a commitment to using only the finest ingredients, our
                products are known for their unique flavors and wholesome
                qualities. Our skilled bakers create a wide array of delicious
                treats that are freshly baked and ready to be enjoyed by our
                customers seeking exceptional taste and quality.
              </Text>
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
                Flour, eggs, sugar
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 4,
                paddingBottom: 4,
                marginTop: 8,
                marginBottom: "10%",
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
