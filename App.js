import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Store from "./components/Store";

export default function App() {
  return <Store />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
