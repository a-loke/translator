import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import uuid from "react-native-uuid";

import colors from "./../utils/colors";
import supportedLanguages from "../utils/supportedLanguages";
import { translate } from "../utils/translate";
import { useDispatch, useSelector } from "react-redux";
import { addHistoryItem } from "../store/historySlice";
import ResultItem from "../components/ResultItem";

export default function HomeScreen(props) {
    const params = props.route.params || {};
    const dispatch = useDispatch();
    const history = useSelector((state) => state.history.items);

    const [enteredText, setEnteredText] = useState("");
    const [resultText, setResultText] = useState("");
    const [languageFrom, setLanguageFrom] = useState("en");
    const [languageTo, setLanguageTo] = useState("ta");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (params.languageTo) {
            setLanguageTo(params.languageTo);
        }
        if (params.languageFrom) {
            setLanguageFrom(params.languageFrom);
        }
    }, [params.languageTo, params.languageFrom]);

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await translate(
                enteredText,
                languageFrom,
                languageTo
            );
            if (!result) {
                setResultText("");
                return;
            }
            const translatedText = result.translated_text[result.to];
            setResultText(translatedText);
            result.id = uuid.v4();
            dispatch(addHistoryItem({ item: result }));
        } catch (error) {
            setResultText("");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [enteredText, languageTo, languageFrom]);

    const copyToClipboard = useCallback(async () => {
        await Clipboard.setStringAsync(resultText);
    }, [resultText]);

    return (
        <View style={styles.container}>
            <View style={styles.langContainer}>
                <TouchableOpacity
                    style={styles.langOption}
                    onPress={() =>
                        props.navigation.navigate("languageSelectScreen", {
                            title: "Translate From",
                            selected: languageFrom,
                            mode: "from",
                        })
                    }
                >
                    <Text style={styles.langOptionText}>
                        {supportedLanguages[languageFrom]}
                    </Text>
                </TouchableOpacity>
                <View style={styles.arrowContainer}>
                    <AntDesign
                        name="arrowright"
                        size={24}
                        color={colors.lightGrey}
                    />
                </View>
                <TouchableOpacity
                    style={styles.langOption}
                    onPress={() =>
                        props.navigation.navigate("languageSelectScreen", {
                            title: "Translate To",
                            selected: languageTo,
                            mode: "to",
                        })
                    }
                >
                    <Text style={styles.langOptionText}>
                        {supportedLanguages[languageTo]}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder="Enter your text..."
                    style={styles.textContainer}
                    onChangeText={(text) => setEnteredText(text)}
                ></TextInput>
                <TouchableOpacity
                    onPress={isLoading ? undefined : onSubmit}
                    disabled={enteredText === ""}
                    style={styles.iconContainer}
                >
                    {isLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.primary}
                        />
                    ) : (
                        <Ionicons
                            name="arrow-forward-circle-sharp"
                            size={24}
                            color={
                                enteredText !== ""
                                    ? colors.primary
                                    : colors.primaryDisabled
                            }
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{resultText}</Text>
                <TouchableOpacity
                    onPress={copyToClipboard}
                    disabled={resultText === ""}
                    style={styles.iconContainer}
                >
                    <MaterialIcons
                        name="content-copy"
                        size={24}
                        color={
                            resultText !== ""
                                ? colors.text
                                : colors.textDisabled
                        }
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.historyConatainer}>
                <FlatList
                    data={history}
                    renderItem={(itemData) => {
                        return <ResultItem itemId={itemData.item.id} />;
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    langContainer: {
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    langOption: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
    },
    arrowContainer: {
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    langOptionText: {
        color: colors.primary,
        fontFamily: "regular",
        letterSpacing: 0.5,
    },
    inputContainer: {
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: "regular",
        letterSpacing: 0.3,
        color: colors.text,
        height: 90,
    },
    iconContainer: {
        paddingHorizontal: 10,
        alignContent: "center",
        justifyContent: "center",
    },
    resultContainer: {
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        height: 90,
        paddingVertical: 10,
    },
    resultText: {
        flex: 1,
        paddingHorizontal: 15,
        fontFamily: "regular",
        color: colors.primary,
    },
    historyConatainer: {
        flex: 1,
        backgroundColor: colors.greyBackground,
        padding: 10,
    },
});
