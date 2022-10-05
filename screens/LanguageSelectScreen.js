import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
    HeaderButton,
    HeaderButtons,
    Item,
} from "react-navigation-header-buttons";
import colors from "../utils/colors";
import supportedLanguages from "../utils/supportedLanguages";
import LanguageItem from "./../components/LanguageItem";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            IconComponent={Ionicons}
            iconSize={23}
            color={props.color || colors.primary}
            {...props}
        />
    );
};
export default function LanguageSelectScreen({ navigation, route }) {
    const params = route.params || {};
    const { title, selected } = params;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        iconName="close"
                        color={colors.text}
                        onPress={() => navigation.goBack()}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    const onLanguageSelect = useCallback(
        (langKey) => {
            const dataKey =
                params.mode === "to" ? "languageTo" : "languageFrom";
            navigation.navigate("home", { [dataKey]: langKey });
        },
        [params, navigation]
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(supportedLanguages)}
                renderItem={(itemData) => {
                    const langKey = itemData.item;
                    const language = supportedLanguages[langKey];
                    return (
                        <LanguageItem
                            onPress={() => onLanguageSelect(langKey)}
                            selectedLanguage={langKey === selected}
                            text={language}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
