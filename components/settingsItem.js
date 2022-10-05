import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

export default settingsItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {props.title}
                </Text>

                <Text numberOfLines={1} style={styles.subTitle}>
                    {props.subTitle}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <props.iconFamily
                    name={props.iconName}
                    size={24}
                    color={colors.primary}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "row",
        borderColor: colors.lightGrey,
        borderTopWidth: 0,
        borderWidth: 0.5,
        backgroundColor: "white",
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    title: {
        fontFamily: "medium",
        letterSpacing: 0.3,
        color: colors.text,
    },
    subTitle: {
        fontFamily: "regular",
        letterSpacing: 0.3,
        color: colors.subText,
        fontSize: 13,
    },
    iconContainer: {
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
