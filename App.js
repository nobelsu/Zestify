import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home";
import Store from "./components/Store";
import Login from "./components/Login";
import Register from "./components/Register";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./components/Splash";
import Favourites from "./components/Favourite";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import { NetworkContext } from "./exports";
import Reserve from "./components/Reserve";
import OrderList from "./components/OrderList";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="TabNav"
          component={function Main({ route }) {
            return (
              <NetworkContext.Provider value={route}>
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                  <Tab.Screen name="Home" component={Home} />
                  <Tab.Screen name="Favourites" component={Favourites} />
                  <Tab.Screen name="Orders" component={OrderList} />
                </Tab.Navigator>
              </NetworkContext.Provider>
            );
          }}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          screenOptions={{ gestureEnabled: true }}
        />
        <Stack.Screen
          name="Reserve"
          component={Reserve}
          screenOptions={{ gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
