import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";

import TabNavigator from "./components/TabNavigator";
import LanguageSelectScreen from "./screens/LanguageSelectScreen";
import colors from "./utils/colors";
import store from "./store/store";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                await Font.loadAsync({
                    black: require("./assets/fonts/Roboto-Black.ttf"),
                    blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
                    bold: require("./assets/fonts/Roboto-Bold.ttf"),
                    boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
                    italic: require("./assets/fonts/Roboto-Italic.ttf"),
                    light: require("./assets/fonts/Roboto-Light.ttf"),
                    lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
                    medium: require("./assets/fonts/Roboto-Medium.ttf"),
                    mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
                    regular: require("./assets/fonts/Roboto-Regular.ttf"),
                    thin: require("./assets/fonts/Roboto-Thin.ttf"),
                    thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
                });
            } catch (error) {
                console.log(error);
            } finally {
                setAppIsReady(true);
            }
        };
        prepare();
    }, []);

    const onLayout = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    console.log("App has run");
    return (
        <Provider store={store}>
            <NavigationContainer>
                <View onLayout={onLayout} style={{ flex: 1 }}>
                    <Stack.Navigator
                        screenOptions={{
                            headerTitleStyle: {
                                fontFamily: "medium",
                                color: "white",
                            },
                            headerStyle: {
                                backgroundColor: colors.primary,
                            },
                        }}
                    >
                        <Stack.Group>
                            <Stack.Screen
                                name="main"
                                component={TabNavigator}
                                options={{
                                    title: "Translate",
                                }}
                            />
                        </Stack.Group>

                        <Stack.Group
                            screenOptions={{
                                presentation: "containedModal",
                                headerStyle: {
                                    backgroundColor: "white",
                                },
                                headerTitleStyle: {
                                    color: colors.text,
                                    fontFamily: "medium",
                                },
                            }}
                        >
                            <Stack.Screen
                                name="languageSelectScreen"
                                component={LanguageSelectScreen}
                            />
                        </Stack.Group>
                    </Stack.Navigator>
                </View>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
