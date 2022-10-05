import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ResultItem from "../components/ResultItem";
import colors from "../utils/colors";

export default function SavedScreen() {
    const savedItems = useSelector((state) => state.savedItems.items);
    if (savedItems.length === 0) {
        return (
            <View style={styles.noItemscontainer}>
                <Text style={styles.noItemsText}>Nothing to Show</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={savedItems}
                renderItem={(itemData) => {
                    return <ResultItem itemId={itemData.item.id} />;
                }}
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
    noItemscontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noItemsText: {
        fontFamily: "medium",
        fontSize: 18,
        color: colors.text,
    },
});
