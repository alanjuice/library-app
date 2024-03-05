//Consists of initial stack navigation for  navigation between - Login, Forgot and Main

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Menu from "./HomeStack/Menu";
import Student from "./HomeStack/Students";
import Allocate from "./HomeStack/Allocate";

const Stack = createStackNavigator();

const HomeStack = () => {
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Allocate"
        component={Allocate}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
