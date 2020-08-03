import {StyleSheet, ViewStyle} from "react-native";

export interface IFieldStyles {
    base: ViewStyle,
    btn: ViewStyle,
    group: ViewStyle,
    groupStart: ViewStyle,
    groupMiddle: ViewStyle,
    groupEnd: ViewStyle,
}

export const FieldStyles = StyleSheet.create<IFieldStyles>( {
    base: {
        marginBottom: 5,
        alignItems: "stretch",
    },
    btn: {
        alignItems: "stretch",
        flexGrow: 1,
        justifyContent: "center"
    },
    group: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#000000",
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
