import { Alert, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsItem from "../components/settingsItem";
import colors from "../utils/colors";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearHistory } from "../store/historySlice";
import { setSavedItems } from "../store/savedItemsSlice";

export default function SettingsScreen() {
    const dispatch = useDispatch();
    const deleteHistory = useCallback(async () => {
        try {
            await AsyncStorage.setItem("history", JSON.stringify([]));
            dispatch(clearHistory());
            Alert.alert("Success", "History cleared");
        } catch (error) {
            console.log(error);
        }
    });
    const deleteSavedItems = useCallback(async () => {
        try {
            await AsyncStorage.setItem("savedItems", JSON.stringify([]));
            dispatch(setSavedItems({ items: [] }));
            Alert.alert("Success", "Saved items cleared");
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <View style={styles.container}>
            <SettingsItem
                onPress={deleteHistory}
                title="Clear History"
                subTitle="Clears all your Translations history"
                iconFamily={MaterialIcons}
                iconName={"delete-forever"}
            />
            <SettingsItem
                onPress={deleteSavedItems}
                title="Clear Saved Items"
                subTitle="Clears all your Saved Items in history"
                iconFamily={MaterialIcons}
                iconName={"delete"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.greyBackground,
        padding: 10,
    },
});
