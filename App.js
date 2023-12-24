import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home";
import Store from "./components/Store";
import Login from "./components/Login";
import Register from "./components/Register";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Home"
          component={function Main() {
            return (
              <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Store" component={Store} />
              </Tab.Navigator>
            );
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
