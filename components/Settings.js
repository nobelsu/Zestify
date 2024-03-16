import {
  NavigationContainer,
  usePreventRemoveContext,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useContext } from "react";
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
  Keyboard,
  Modal,
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
} from "firebase/firestore";
import { NetworkContext } from "../exports";
import {
  getAuth,
  signOut,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const codes = {
  "auth/invalid-email": {
    id: 1,
    msg: "Invalid email!",
  },
  "auth/missing-password": {
    id: 2,
    msg: "Missing password!",
  },
  "auth/invalid-credential": {
    id: 3,
    msg: "Invalid credentials!",
  },
  "auth/missing-email": {
    id: 4,
    msg: "Missing email!",
  },
  "auth/weak-password": {
    id: 5,
    msg: "Password must have at least 6 characters!",
  },
};

export default function Settings() {
  const navigation = useNavigation();
  const value = useContext(NetworkContext);
  const auth = getAuth();
  const [user, setUser] = useState(value.params.user);
  const [isuser, setIsuser] = useState(false);
  const [name, setName] = useState("");
  const [reload, setReload] = useState(false);
  const [pass, setPass] = useState("");
  const [vis, setVis] = useState(false);
  const [codee, setCodee] = useState("");
  const [oldpass, setOldpass] = useState("");
  const [oldvis, setOldvis] = useState("");
  const [modvis, setModvis] = useState(false);
  const [namevis, setNamevis] = useState(false);
  useEffect(() => {
    async function Temp() {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      setIsuser(docSnap.exists());
      if (docSnap.exists) setName(docSnap.data().name);
    }
    Temp();
  }, [reload]);

  return (
    <ScrollView style={{ height: "100%" }}>
      <Modal transparent={true} visible={modvis} animationType="fade">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setModvis(false);
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
                updatePassword(auth.currentUser, pass)
                  .then(() => {
                    console.log(pass);
                  })
                  .catch((error) => {
                    setCodee(codes[error.code].msg);
                    setVis(1);
                  });
                setModvis(false);
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <Modal transparent={true} visible={namevis} animationType="fade">
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.6)`,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setNamevis(false);
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
                const docRef = doc(db, "users", user);
                await updateDoc(docRef, { name: name });
                setNamevis(false);
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <Text
        style={{
          marginLeft: "5%",
          marginTop: "15%",
          fontSize: 30,
          fontWeight: 900,
        }}
      >
        Settings
      </Text>
      {isuser ? (
        <View style={{ width: "90%", marginLeft: "5%", marginTop: "6%" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Personalisation
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 200,
              marginTop: "1%",
            }}
          >
            Personalize your account details!
          </Text>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginTop: "5%",
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{}}>Name</Text>
            </View>

            <View
              style={{
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#BF41B7",
                flexDirection: "row",
                flex: 5,
              }}
            >
              <View
                style={{
                  flex: 3,
                  backgroundColor: "white",
                  borderTopLeftRadius: 17,
                  borderBottomLeftRadius: 17,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{
                    width: "90%",
                  }}
                  placeholder="Type here..."
                  maxLength={20}
                  autoComplete="off"
                  textContentType="oneTimeCode"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                />
              </View>

              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: "#BF41B7",
                  borderTopRightRadius: 17,
                  borderBottomRightRadius: 17,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={async () => {
                  if (name == "") {
                    setReload(!reload);
                  } else {
                    setNamevis(true);
                  }
                }}
              >
                <Text style={{ color: "white" }}>Change</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}
      <View style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Authentication
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 200,
            marginTop: "1%",
          }}
        >
          Manage your account authentication!
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            marginTop: "5%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{}}>Old Password</Text>
          </View>

          <View
            style={{
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#BF41B7",
              flexDirection: "row",
              flex: 3.5,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  width: "90%",
                }}
                placeholder="Type here..."
                maxLength={20}
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="off"
                value={oldpass}
                onChangeText={(text) => {
                  setOldpass(text);
                }}
              />
            </View>
          </View>
        </View>
        <View>
          {oldvis ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                style={{ color: "red" }}
              />
              <Text
                style={{
                  color: "red",
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                {codee}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            marginTop: "5%",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{}}>New Password</Text>
          </View>

          <View
            style={{
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#BF41B7",
              flexDirection: "row",
              flex: 3.5,
            }}
          >
            <View
              style={{
                flex: 3,
                backgroundColor: "white",
                borderTopLeftRadius: 17,
                borderBottomLeftRadius: 17,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  width: "90%",
                }}
                placeholder="Type here..."
                maxLength={20}
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="off"
                value={pass}
                editable
                onChangeText={(text) => {
                  setPass(text);
                }}
              />
            </View>

            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#BF41B7",
                borderTopRightRadius: 17,
                borderBottomRightRadius: 17,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                setVis(0);
                setOldvis(0);

                const docRef = doc(db, "users", user);
                const docSnap = await getDoc(docRef);
                const auth = getAuth();
                signInWithEmailAndPassword(auth, docSnap.data().email, oldpass)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    if (pass.length < 6) {
                      setCodee(codes["auth/weak-password"].msg);
                      setVis(1);
                    } else {
                      setModvis(true);
                    }
                  })
                  .catch((error) => {
                    setCodee(codes[error.code].msg);
                    setOldvis(1);
                  });
              }}
            >
              <Text style={{ color: "white" }}>Change</Text>
            </Pressable>
          </View>
        </View>
        <View>
          {vis ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                style={{ color: "red" }}
              />
              <Text
                style={{
                  color: "red",
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 300,
                }}
              >
                {codee}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>

      <Pressable
        style={{
          width: "90%",
          backgroundColor: "#BF41B7",
          height: 50,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "5%",
          marginTop: 30,
        }}
        onPress={async () => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              navigation.navigate("Login");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}
