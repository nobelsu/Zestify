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
    <View style={{ height: "100%", width: "100%", backgroundColor: "#d6d6d6" }}>
      <View style={{ flex: 1 }}>
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
                  color={hearted ? "#30D9BA" : "white"}
                  size={36}
                  style={{
                    marginLeft: "70%",
                    paddingLeft: 6,
                    paddingTop: 6,
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
                    width: "60%",
                    aspectRatio: 1,
                    borderRadius: 5000,
                    marginLeft: "15%",
                    borderWidth: 2,
                    borderColor: "#30D9BA",
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
                    fontWeight: 900,
                    width: 200,
                  }}
                >
                  Rating:{" "}
                  <Text
                    style={{
                      color: "#30D9BA",
                    }}
                  >
                    4.5/5
                  </Text>
                </Text>
                <Progress.Bar
                  progress={0.9}
                  width={200}
                  color="#30D9BA"
                  height={10}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 2.5 }}>
        <View
          style={{
            flexDirection: "row",
            height: "8%",
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 900,
              marginTop: "3%",
              marginLeft: "5%",
              flex: 7,
              color: "#400235",
            }}
          >
            TOUS les JOURS
          </Text>
          <View
            style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                width: "70%",
                backgroundColor: "#30D9BA",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                3 left
              </Text>
            </View>
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
              color: "#400235",
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
              paddingBottom: 16,
              color: "#400235",
            }}
          >
            53 South Carriage Dr. Tuscaloosa, AL 35405
          </Text>
        </View>
        <ScrollView
          style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700, color: "#400235" }}>
            What to expect
          </Text>
          <Text
            style={{
              textAlign: "justify",
              marginTop: 8,
              fontWeight: 200,
              color: "#400235",
            }}
          >
            With a commitment to using only the finest ingredients, our products
            are known for their unique flavors and wholesome qualities. Our
            skilled bakers create a wide array of delicious treats that are
            freshly baked and ready to be enjoyed by our customers seeking
            exceptional taste and quality.
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 20,
              color: "#400235",
            }}
          >
            Ingredients & Allergens
          </Text>
          <Text
            style={{
              textAlign: "justify",
              marginTop: 8,
              fontWeight: 200,
              color: "#400235",
            }}
          >
            Flour, eggs, sugar
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 20,
              color: "#400235",
            }}
          >
            Highlights
          </Text>
          <Badge id={0} />
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.4,
          backgroundColor: "transparent",
          flexDirection: "row",
          position: "absolute",
          marginTop: "185%",
          width: "100%",
          height: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            width: "35%",
            backgroundColor: "#30D9BA",
            height: "50%",
            marginRight: "5%",
            borderRadius: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: 900 }}>
            Reserve
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "35%",
            backgroundColor: "#BF41B7",
            height: "50%",
            marginLeft: "5%",
            borderRadius: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: 900 }}>
            Order
          </Text>
        </Pressable>
      </View>
    </View>
    //   <View style={{ height: "100%", width: "100%" }}>

    //     <View style={{ flex: 2, backgroundColor: "white" }}>
    //       <ImageBackground
    //         source={{
    //           uri: "https://daebak.co/cdn/shop/articles/spotlight-on-tous-les-jours-daebak-753554_1080x.jpg?v=1663736497",
    //         }} // replace with banner
    //         style={{
    //           height: "100%",
    //           width: "100%",
    //         }}
    //       >
    //         <View
    //           style={{
    //             backgroundColor: "rgba(0, 0, 0, 0.5)",
    //             width: "100%",
    //             flex: 1,
    //           }}
    //         >
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               flex: 1,
    //               width: "100%",
    //             }}
    //           >
    //             <View style={{ flex: 1 }}>
    //               <Ionicons
    //                 name="arrow-back-outline"
    //                 color="white"
    //                 size={36}
    //                 style={{
    //                   marginTop: "20%",
    //                   marginLeft: "10%",
    //                 }}
    //               />
    //             </View>

    //             <View
    //               style={{
    //                 flex: 1,
    //               }}
    //             >
    //               <Ionicons
    //                 name={hearted ? "heart" : "heart-outline"}
    //                 color={hearted ? "#9591F2" : "white"}
    //                 size={36}
    //                 style={{
    //                   marginLeft: "70%",
    //                   paddingLeft: 6,
    //                   paddingTop: 6,
    //                   marginTop: "20%",
    //                   backgroundColor: "rgba(0, 0, 0, 0.4)",
    //                   width: 48,
    //                   height: 48,
    //                   // borderRadius: "50%",
    //                 }}
    //                 onPress={heartStatus}
    //               />
    //             </View>
    //           </View>
    //           <View style={{ flexDirection: "row", flex: 2 }}>
    //             <View
    //               style={{
    //                 flex: 1,
    //                 marginLeft: "5%",
    //                 marginTop: "15%",
    //               }}
    //             >
    //               <Image
    //                 source={{
    //                   uri: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/tous.jpg",
    //                 }}
    //                 style={{
    //                   width: "40%",
    //                   aspectRatio: 1,
    //                   // borderRadius: "50%"
    //                 }}
    //               />
    //             </View>
    //             <View
    //               style={{
    //                 backgroundColor: "#BF4904",
    //                 flex: 1,
    //                 marginTop: "7%",
    //                 // borderRadius: "10%",
    //                 justifyContent: "center",
    //               }}
    //             >
    //               <Text
    //                 style={{
    //                   fontSize: 13,
    //                   textAlign: "center",
    //                   fontWeight: 300,
    //                   color: "#7a8799",
    //                   textDecorationLine: "line-through",
    //                 }}
    //               >
    //                 $14.99
    //               </Text>
    //               <Text
    //                 style={{
    //                   fontSize: 18,
    //                   textAlign: "center",
    //                   fontWeight: 900,
    //                   color: "#CEDEF2",
    //                 }}
    //               >
    //                 $4.99
    //               </Text>
    //             </View>
    //           </View>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //     <View style={{ flex: 2, backgroundColor: "white" }}>
    //       <Text style={[styles.header2, { marginTop: "3%" }]}>
    //         TOUS les JOURS
    //       </Text>
    //       <View style={{ flexDirection: "row", marginTop: "2%" }}>
    //         <View style={{ flex: 1 }}>
    //           <Ionicons name="time-outline" size={22} style={{ marginTop: 2 }} />
    //         </View>
    //         <View style={{ flex: 8 }}>
    //           <Text
    //             style={[styles.header3, { width: "100%", marginLeft: "10%" }]}
    //           >
    //             15:00-17:00
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <Text
    //         style={[
    //           styles.header3,
    //           {
    //             width: "100%",
    //             textAlign: "center",
    //             color: "#3876F2",
    //             fontWeight: 700,
    //           },
    //         ]}
    //       >
    //         7085 Sage St. Oviedo, FL 32765
    //       </Text>
    //     </View>
    //     <ScrollView style={{ flex: 11 }}>
    //       <Text></Text>
    //       <Text></Text>
    //     </ScrollView>
    //   </View>
  );
}

const styles = StyleSheet.create({
  header1: {
    fontSize: 16,
    fontWeight: 500,
  },
  header2: {
    fontSize: 30,
    fontWeight: 800,
  },
  header3: {
    fontSize: 20,
  },
});
