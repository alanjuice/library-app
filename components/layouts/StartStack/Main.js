import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./MainNav/Home";
import InfoScreen from "./MainNav/Info";
import SettingsScreen from "./MainNav/Settings";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator tabBarOptions={{
       
      tabStyle: { borderTopWidth: 0.2, Color: '#ffff',borderColor:'blue' }, // Remove line above icon
      // You can add more styles as needed
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'St Marys Sunday School',
          headerStyle: { backgroundColor: '#ffff' },
          headerTitleStyle: { fontWeight: '900', },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'St Marys Sunday School',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
