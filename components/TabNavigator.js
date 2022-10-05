import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: (props) => (
                        <Entypo
                            name="home"
                            size={props.size}
                            color={props.color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="saved"
                component={SavedScreen}
                options={{
                    tabBarLabel: "Saved",
                    tabBarIcon: (props) => (
                        <Entypo
                            name="star"
                            size={props.size}
                            color={props.color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: (props) => (
                        <Ionicons
                            name="settings"
                            size={props.size}
                            color={props.color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
