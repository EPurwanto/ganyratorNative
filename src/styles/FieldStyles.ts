import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IFieldStyles {
    base: ViewStyle,
    label: TextStyle,
    btn: ViewStyle,
    group: ViewStyle,
    groupStart: ViewStyle,
    groupMiddle: ViewStyle,
    groupEnd: ViewStyle,
}

export function FieldStyles(theme: Theme) {
    return StyleSheet.create<IFieldStyles>( {
        base: {
            marginBottom: 5,
        },
        label: {
            fontFamily: "Lato_700Bold",
        },
        btn: {
            alignItems: "stretch",
            justifyContent: "center",
            borderWidth: 0,
        },
        group: {
            borderWidth: 1,
            borderRadius: 8,
            borderBottomColor: theme.colors.border,
            padding: 8,
        },
        groupStart: {
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        },
        groupMiddle: {
            borderRightWidth: 0,
            borderRadius: 0,
        },
        groupEnd: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
    });
}
