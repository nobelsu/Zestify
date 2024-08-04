import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home";
import Store from "./components/Store";
import Login from "./components/Login";
import Register from "./components/Register";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./components/Splash";
import Favourites from "./components/Favourite";
const Tab = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();
const Stack = createStackNavigator();
import { NetworkContext } from "./exports";
import Reserve from "./components/Reserve";
import OrderList from "./components/OrderList";
import StoreSide from "./components/StoreSide";
import StoreCamera from "./components/StoreCamera";
import StoreOrderDetails from "./components/StoreOrderDetails";
import OrderStore from "./components/OrderStore";
import Settings from "./components/Settings";
import Name from "./components/Name";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MaterialCommunityIcons,
  Feather,
  Foundation,
} from "@expo/vector-icons";
import Home2 from "./components/Home2";
import Store2 from "./components/Store2";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash">
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
          name="Name"
          component={Name}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="TabNav"
          component={function Main({ route }) {
            return (
              <NetworkContext.Provider value={route}>
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false
                  }}>
                  <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={!focused ? "home-outline" : "home"}
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab.Screen
                    name="Favourites"
                    component={Favourites}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={!focused ? "bookmark-outline" : "bookmark"}
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab.Screen
                    name="Orders"
                    component={OrderList}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={!focused ? "cart-outline" : "cart"}
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={
                              !focused
                                ? "account-circle-outline"
                                : "account-circle"
                            }
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                </Tab.Navigator>
              </NetworkContext.Provider>
            );
          }}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="TabNav2"
          component={function Main2({ route }) {
            return (
              <NetworkContext.Provider value={route}>
                <Tab2.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false
                  }}>
                  <Tab2.Screen
                    name="StoreSide"
                    component={StoreSide}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={
                              !focused ? "account-edit-outline" : "account-edit"
                            }
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab2.Screen
                    name="Camera"
                    component={StoreCamera}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={!focused ? "qrcode-scan" : "qrcode"}
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab2.Screen
                    name="StoreOrder"
                    component={OrderStore}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={!focused ? "bookmark-outline" : "bookmark"}
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                  <Tab2.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      gestureEnabled: false,
                      tabBarIcon: ({ tint, focused }) => {
                        return (
                          <MaterialCommunityIcons
                            name={
                              !focused
                                ? "account-circle-outline"
                                : "account-circle"
                            }
                            size={30}
                            style={{ color: "#BF41B7" }}
                          />
                        );
                      }
                    }}
                  />
                </Tab2.Navigator>
              </NetworkContext.Provider>
            );
          }}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home2"
          component={Home2}
          screenOptions={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Store"
          component={Store}
          screenOptions={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Store2"
          component={Store2}
          screenOptions={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Reserve"
          component={Reserve}
          screenOptions={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="StoreOrderDetails"
          component={StoreOrderDetails}
          screenOptions={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
