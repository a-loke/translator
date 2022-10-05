import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../utils/colors";

export default function LanguageItem({ selectedLanguage, text, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconContainer}>
                {selectedLanguage && (
                    <Feather name="check" size={18} color={colors.primary} />
                )}
            </View>
            <Text
                style={selectedLanguage ? styles.selectedText : styles.text}
                colors={colors.primary}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    iconContainer: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 7,
    },
    text: {
        flex: 1,
        fontFamily: "regular",
        letterSpacing: 0.3,
    },
    selectedText: {
        color: colors.primary,
        flex: 1,
        fontFamily: "regular",
        letterSpacing: 0.3,
    },
});
