import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper"; // Import IconButton from react-native-paper

// Screens
import Menu from "./HomeStack/Menu";
import Student from "./HomeStack/Students";
import Books from "./HomeStack/Books";
import Allocate from "./HomeStack/Allocate";
import Analytics from "./HomeStack/Analytics";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  // Destructure navigation from props
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Students"
        component={Student}
        options={({ route }) => ({
          headerLeft:
            route.name !== "Menu" // Check if the current route is not "Menu"
              ? () => (
                  <IconButton
                    icon="arrow-left"
                    color="black" // Set icon color to black
                    onPress={() => navigation.goBack()} // Go back when pressed
                  />
                )
              : undefined, // If the current route is "Menu", set headerLeft to undefined
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Allocate"
        component={Allocate}
        options={({ route }) => ({
          headerLeft:
            route.name !== "Menu" // Check if the current route is not "Menu"
              ? () => (
                  <IconButton
                    icon="arrow-left"
                    color="black" // Set icon color to black
                    onPress={() => navigation.goBack()}
                  />
                )
              : undefined, // If the current route is "Menu", set headerLeft to undefined
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Books"
        component={Books}
        options={({ route }) => ({
          headerLeft:
            route.name !== "Menu" // Check if the current route is not "Menu"
              ? () => (
                  <IconButton
                    icon="arrow-left"
                    color="black" // Set icon color to black
                    onPress={() => navigation.goBack()}
                  />
                )
              : undefined, // If the current route is "Menu", set headerLeft to undefined
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={({ route }) => ({
          headerLeft:
            route.name !== "Menu" // Check if the current route is not "Menu"
              ? () => (
                  <IconButton
                    icon="arrow-left"
                    color="black" // Set icon color to black
                    onPress={() => navigation.goBack()}
                  />
                )
              : undefined, // If the current route is "Menu", set headerLeft to undefined
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
