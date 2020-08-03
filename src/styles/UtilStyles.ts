import {StyleSheet, ViewStyle} from "react-native";

export interface IUtilStyles {
    container: ViewStyle,
    row: ViewStyle,
    grow1: ViewStyle,
    btn: ViewStyle,
}

export const fontSize = {
    small: 14,
    medium: 20,
    large: 25,
};

export const highlightUnderlay = "#DDDDDD";

export const UtilStyles = StyleSheet.create<IUtilStyles>({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        fontSize: fontSize.medium,
    },
    row: {
        flexDirection: "row"
    },
    grow1: {
        flexGrow: 1,
    },
    btn: {
    },
});
