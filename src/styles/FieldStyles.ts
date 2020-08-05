import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {colours} from "./UtilStyles";

export interface IFieldStyles {
    base: ViewStyle,
    label: TextStyle,
    btn: ViewStyle,
    group: ViewStyle,
    groupStart: ViewStyle,
    groupMiddle: ViewStyle,
    groupEnd: ViewStyle,
}

export const FieldStyles = StyleSheet.create<IFieldStyles>( {
    base: {
        marginBottom: 5,
    },
    label: {
        fontFamily: "Lato_700Bold",
    },
    btn: {
        alignItems: "stretch",
        // flexGrow: 1,
        justifyContent: "center",
        borderWidth: 0,
    },
    group: {
        borderWidth: 1,
        borderRadius: 8,
        borderBottomColor: colours.border,
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
