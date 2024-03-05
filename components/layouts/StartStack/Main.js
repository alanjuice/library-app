//Visible after logging in
//Consists of 3-4 navbar items for
//Each navbar icon leads to diffrent screen
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./MainNav/Home";
import InfoScreen from "./MainNav/Info";
import SettingsScreen from "./MainNav/Settings";

const Tab = createBottomTabNavigator();

function TabScreens() {
  return (
    <Tab.Navigator style={{ backgroundColor: "blue" }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainScreen() {
  return (
    <>
      <TabScreens />
    </>
  );
}
