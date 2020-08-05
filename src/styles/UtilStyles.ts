import {StyleSheet, TextStyle, ViewStyle} from "react-native";

export interface IUtilStyles {
    container: ViewStyle,
    row: ViewStyle,
    grow1: ViewStyle,
    p0: ViewStyle,
    pv0: ViewStyle,
    m0: ViewStyle,
    mr15: ViewStyle,
    w55: ViewStyle,
    btn: ViewStyle,
    btnPrimary: ViewStyle,
    btnSuccess: ViewStyle,
    btnDanger: ViewStyle,
    txtCenter: TextStyle,
    txtRight: TextStyle,
    txtPrimary: ViewStyle,
    txtSuccess: ViewStyle,
    txtDanger: ViewStyle,
    picker: ViewStyle,
    pickerItem: TextStyle,
}

export const fontSize = {
    small: 14,
    medium: 20,
    large: 25,
    title: 30,
};

export const colours = {
    primary: "#3d82ff",
    success: "#28d200",
    danger: "#cb2005",
    border: "#000000",
    highlightUnderlay: "#DDDDDD",
};

export const highlightUnderlay = "#DDDDDD";

export const UtilStyles = StyleSheet.create<IUtilStyles>({
    container: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: "#FFFFFF",
        fontSize: fontSize.medium,
        fontFamily: "Lato_400Regular",
    },
    row: {
        flexDirection: "row"
    },
    grow1: {
        flexGrow: 1,
    },
    p0: {
        padding: 0,
    },
    pv0: {
        paddingVertical: 0,
    },
    m0: {
        margin: 0,
    },
    mr15: {
        marginRight: 15,
    },
    w55: {
        width: 55,
    },
    btn: {
        padding: 8,
        borderRadius: 8,
    },
    btnPrimary: {
        backgroundColor: colours.primary,
        color: "white",
    },
    btnSuccess: {
        backgroundColor: colours.success,
    },
    btnDanger: {
        backgroundColor: colours.danger,
        color: "white",
    },
    txtCenter: {
        textAlign: "center",
    },
    txtRight: {
        textAlign: "right"
    },
    txtPrimary: {
        color: "white",
        textAlign: "center"
    },
    txtSuccess: {
        color: "white",
        textAlign: "center"
    },
    txtDanger: {
        color: "white",
        textAlign: "center"
    },
    picker: {
        height: 21,
        fontSize: fontSize.small,
    },
    pickerItem: {
        height: 21,
        fontSize: fontSize.small,
    },
});
