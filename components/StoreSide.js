import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useIsFocused} from "@react-navigation/native";
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
  Modal,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
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
  deleteDoc,
  GeoPoint,
} from "firebase/firestore";
import { NetworkContext, currencyCodes } from "../exports";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dropdown } from "react-native-element-dropdown";

export default function StoreSide() {
  const isFocused = useIsFocused();
  const value = useContext(NetworkContext);
  const [user, setUser] = useState(value.params.user);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState({ latitude: 0, longitude: 0 });
  const [time, setTime] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState("");
  const [oriprice, setOriprice] = useState("");
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [ing, setIng] = useState("");
  const [pressed, setPressed] = useState(false);
  const [vis, setVis] = useState(false);
  const [marker, setMarker] = useState({ latitude: 0, longitude: 0 });
  const [secondPress, setSecondPress] = useState(false);
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("IDR");
  const [valoo, setValoo] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(()=> {
    setUser(value.params.user);
  }, [isFocused])

  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "stores", user);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name);
      setDesc(docSnap.data().desc);
      // console.log(docSnap.data().loc.latitude);
      setLoc({
        latitude: docSnap.data().loc.latitude,
        longitude: docSnap.data().loc.longitude,
      });
      setTime(docSnap.data().collection);
      setStock(String(docSnap.data().stock));
      setAddress(docSnap.data().address);
      setMarker({
        latitude: docSnap.data().loc.latitude,
        longitude: docSnap.data().loc.longitude,
      });
      setIng(docSnap.data().ing);
      setLogo(docSnap.data().logo);
      setBanner(docSnap.data().banner);
      setOriprice(String(docSnap.data().oriprice));
      setPrice(String(docSnap.data().price));
      setCurrency(docSnap.data().currency);
    }
    Temp();
  }, [secondPress, user]);

  const SCWIDTH = Dimensions.get("window").width;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={50}
    >
      <Modal transparent={true} visible={vis} animationType="fade">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setVis(false);
          }}
        >
          <View
            style={{
              height: 280,
              width: 280,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <Ionicons color={"#BF41B7"} name="alert-circle-outline" size={80} />
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontWeight: 600,
                fontSize: 16,
                width: "90%",
                textAlign: "center",
              }}
            >
              Notice
            </Text>
            <Text style={{ width: "90%", textAlign: "center" }}>
              Please confirm that you would like to save these changes.
            </Text>

            <Pressable
              style={{
                width: "90%",
                height: 45,
                backgroundColor: "#BF41B7",
                marginTop: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                const docRef = doc(db, "stores", user);
                try {
                  await updateDoc(docRef, {
                    name: name,
                    desc: desc,
                    loc: new GeoPoint(loc.latitude, loc.longitude),
                    collection: time,
                    stock: Number(stock),
                    price: Number(price),
                    oriprice: Number(oriprice),
                    ing: ing,
                    banner: banner,
                    logo: logo,
                    address: address,
                    currency: currency,
                  });
                } catch (error) {
                  console.log(error);
                }
                setPressed(!pressed);
                setSecondPress(!secondPress);
                setEdit(false);
                setVis(false);
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <ScrollView>
        <Text
          style={{
            marginLeft: "5%",
            marginTop: "23%",
            fontSize: 30,
            fontWeight: 900,
          }}
        >
          My store
        </Text>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            NAME
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={name}
              onChangeText={(text) => setName(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 250,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            DESCRIPTION
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              textAlign="top"
              value={desc}
              onChangeText={(text) => setDesc(text)}
              autoComplete="off"
              multiline={true}
              editable={edit}
              style={{
                color: "#400235",
                height: 200,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
                textAlignVertical: "top",
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 360,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#BF41B7",
              marginBottom: 10,
            }}
          >
            LOCATION
          </Text>
          <MapView
            initialRegion={{
              latitude: marker["latitude"] != 0 ? marker["latitude"] : -6.1728,
              longitude:
                marker["longitude"] != 0 ? marker["longitude"] : 106.8272,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              if (pressed) {
                setMarker(e.nativeEvent.coordinate);
                setLoc(e.nativeEvent.coordinate);
              }
            }}
            style={{ height: 300, width: "100%" }}
          >
            {marker ? <Marker coordinate={marker} /> : <View />}
          </MapView>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            ADDRESS
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={address}
              onChangeText={(text) => setAddress(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            COLLECTION TIME
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={time}
              onChangeText={(text) => setTime(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 150,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            marginTop: 10,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            INGREDIENTS
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              textAlign="top"
              value={ing}
              onChangeText={(text) => setIng(text)}
              autoComplete="off"
              multiline={true}
              editable={edit}
              style={{
                color: "#400235",
                height: 100,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
                textAlignVertical: "top",
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            STOCK
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={stock}
              keyboardType="numeric"
              onChangeText={(text) => setStock(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            CURRENCY
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            {edit ? (
              <Dropdown
                style={{
                  width: SCWIDTH * 0.9 - 30,
                  height: 25,
                }}
                data={currencyCodes.map((item, index) => {
                  return { label: item, value: item };
                })}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                value={currency}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCurrency(item.value);
                  setIsFocus(false);
                }}
                selectedTextStyle={{ fontSize: 14 }}
              />
            ) : (
              <Text
                style={{
                  height: 25,
                  fontSize: 14,
                  width: SCWIDTH * 0.9 - 30,
                }}
              >
                {currency}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            NEW PRICE
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="numeric"
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            ORIGINAL VALUE
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Type here..."}
              value={oriprice}
              onChangeText={(text) => setOriprice(text)}
              keyboardType="numeric"
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            LOGO
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Link here..."}
              value={logo}
              onChangeText={(text) => setLogo(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 75,
            width: "90%",
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            padding: 15,
            justifyContent: "center",
            marginTop: 15,
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#BF41B7" }}>
            BANNER
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder={"Link here..."}
              value={banner}
              onChangeText={(text) => setBanner(text)}
              autoCapitalize="none"
              autoComplete="off"
              editable={edit}
              style={{
                color: "#400235",
                height: 25,
                fontSize: 14,
                width: SCWIDTH * 0.9 - 30,
              }}
            />
          </View>
        </View>

        {!edit ? (
          <Pressable
            style={{
              width: "90%",
              backgroundColor: "#BF41B7",
              height: 50,
              marginLeft: "5%",
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setEdit(true);
              setPressed(true);
            }}
          >
            <Text style={{ color: "white" }}>Edit</Text>
          </Pressable>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{
                width: "42.5%",
                borderColor: "#BF41B7",
                height: 50,
                marginLeft: "5%",
                borderRadius: 15,
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
              }}
              onPress={() => {
                setEdit(false);
                setSecondPress(!secondPress);
              }}
            >
              <Text style={{ color: "#BF41B7" }}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{
                width: "42.5%",
                backgroundColor: "#BF41B7",
                height: 50,
                marginLeft: "5%",
                borderRadius: 15,
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                setVis(true);
              }}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
