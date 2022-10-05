import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setSavedItems } from "../store/savedItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResultItem(props) {
    const dispatch = useDispatch();
    const { itemId } = props;
    const item = useSelector((state) =>
        state.history.items.find((item) => item.id === itemId)
    );
    const savedItems = useSelector((state) => state.savedItems.items);

    const isSaved = savedItems.some((item) => item.id === itemId);
    const starIcon = isSaved ? "star" : "star-outlined";

    const starItem = useCallback(async () => {
        let newSavedItems;
        if (isSaved) {
            newSavedItems = savedItems.filter((item) => item.id !== itemId);
        } else {
            newSavedItems = savedItems.slice();
            newSavedItems.push(item);
        }
        await AsyncStorage.setItem("savedItems", JSON.stringify(newSavedItems));
        dispatch(setSavedItems({ items: newSavedItems }));
    }, [dispatch, savedItems]);

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
            <TouchableOpacity onPress={starItem} style={styles.saveIcon}>
                <Entypo name={starIcon} size={24} color={colors.subText} />
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
