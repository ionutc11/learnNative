import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator
        // initialRouteName="User"
        screenOptions={{
          drawerActiveTintColor: "red",
          drawerActiveBackgroundColor: "lime",
          drawerStyle: {
            backgroundColor: "#ccc",
          },
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#ccccc",
            },
            headerTintColor: "red",
            drawerLabel: "Welcomee Screen",
            drawerIcon: (({color, size}) => <Ionicons color={color} name="home" size={size} />)
          }}
        />
        <Drawer.Screen name="User" component={UserScreen} 
          options={{
            drawerIcon: (({color, size}) => <Ionicons color={color} name="person" size={size} />)
          }}
        />
      </Drawer.Navigator> */}

      <BottomTab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ccccc",
          },
          headerTintColor: "green",
          tabBarActiveTintColor: "purple",
        }}
      >
        <BottomTab.Screen name="Welcome" component={WelcomeScreen} />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons color={color} size={size} name="person" />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
