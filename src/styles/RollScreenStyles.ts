import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

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


export function RollScreenStyles(theme: Theme) {
    return StyleSheet.create<IRollScreenStyles>({
        // Roll Screen styles
        resultArea: {
            paddingBottom: 8,
            flexGrow: 1,
            flexShrink: 1,
        },
        resultList: {
            flexGrow: 1,
        },
        resultEntry: {
            borderTopWidth: 1,
            borderColor: theme.colors.border,
            paddingVertical: 5,
        },
        resultTitle: {
            fontSize: theme.fontSize.large,
            fontFamily: "Lato_700Bold",
        },
        resultLabel: {
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_700Bold",
        },
        resultValue: {
        },
        clearButton: {
            position: "absolute",
            right: 0,
            bottom: 8,
        },
        controlArea: {
        },
        picker: {
        },
        pickerBtn: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        rollBtn: {
        },
        heading: {
            fontSize: theme.fontSize.title,
            fontFamily:"Lato_700Bold",
            textAlign: "center",
            textAlignVertical: "center",
        },
        helpText: {
            flexGrow: 1,
            fontSize: theme.fontSize.large,
            textAlign: "center",
            textAlignVertical: "center",
        }
    });
}
