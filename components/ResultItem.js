import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../utils/colors";
import { useSelector } from "react-redux";

export default function ResultItem(props) {
    const { itemId } = props;
    const item = useSelector((state) =>
        state.history.items.find((item) => item.id === itemId)
    );
    return (
        <View style={styles.container}>
            <View style={styles.resultContainer}>
                <Text numberOfLines={2} style={styles.titleText}>
                    {item.original_text}
                </Text>
                <Text numberOfLines={2} style={styles.subTitleText}>
                    {item.translated_text[item.to]}
                </Text>
            </View>
            <TouchableOpacity style={styles.saveIcon}>
                <Entypo name="star" size={24} color={colors.subText} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 3,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: "row",
        borderColor: colors.lightGrey,
        borderTopWidth: 0,
        borderWidth: 0.5,
        backgroundColor: "white",
    },
    resultContainer: {
        flex: 1,
        marginRight: 8,
    },
    titleText: {
        fontFamily: "medium",
        letterSpacing: 0.3,
        color: colors.text,
    },
    subTitleText: {
        fontFamily: "regular",
        letterSpacing: 0.3,
        color: colors.subText,
    },
    saveIcon: {
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
