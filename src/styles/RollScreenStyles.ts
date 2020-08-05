import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {IListStyles} from "./ListStyles";
import {colours, fontSize} from "./UtilStyles";

export interface IRollScreenStyles {
    resultArea: ViewStyle,
    resultList: ViewStyle,
    resultEntry: ViewStyle,
    resultTitle: ViewStyle,
    resultLabel: ViewStyle,
    resultValue: ViewStyle,
    clearButton: ViewStyle,
    controlArea: ViewStyle,
    picker: ViewStyle,
    pickerBtn: ViewStyle,
    rollBtn: ViewStyle,
    heading: TextStyle,
    helpText: TextStyle,
}


export const RollScreenStyles = StyleSheet.create<IRollScreenStyles>({
    // Roll Screen styles
    resultArea: {
        marginVertical: 8,
        flexGrow: 1,
        flexShrink: 1,
    },
    resultList: {
        flexGrow: 1,
        // backgroundColor: "#F0F0F0"
    },
    resultEntry: {
        borderTopWidth: 1,
        borderColor: colours.border
    },
    resultTitle: {
        fontSize: fontSize.large,
        fontFamily: "Lato_700Bold",
    },
    resultLabel: {
        fontSize: fontSize.medium,
        fontFamily: "Lato_700Bold",
    },
    resultValue: {
        fontSize: fontSize.medium,
    },
    clearButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    controlArea: {
        // backgroundColor: "#D0D0D0"
    },
    picker: {
        // flexGrow: 1
    },
    pickerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#E0E0E0"
    },
    rollBtn: {
    },
    heading: {
        fontSize: fontSize.title,
        fontFamily:"Lato_700Bold",
        textAlign: "center",
        textAlignVertical: "center",
        borderColor: colours.border,
        borderBottomWidth: 2,
        padding: 3
    },
    helpText: {
        flexGrow: 1,
        fontSize: fontSize.large,
        textAlign: "center",
        textAlignVertical: "center",
    }
});
