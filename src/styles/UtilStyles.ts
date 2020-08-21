import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IUtilStyles {
    container: ViewStyle,
    row: ViewStyle,
    grow1: ViewStyle,
    shrink1: ViewStyle,
    p0: ViewStyle,
    pv0: ViewStyle,
    m0: ViewStyle,
    mr15: ViewStyle,
    w55: ViewStyle,
    wHalf: ViewStyle,
    btn: ViewStyle,
    btnPrimary: ViewStyle,
    btnSuccess: ViewStyle,
    btnDanger: ViewStyle,
    txt: TextStyle,
    txtCenter: TextStyle,
    txtRight: TextStyle,
    txtPrimary: ViewStyle,
    txtSuccess: ViewStyle,
    txtDanger: ViewStyle,
    picker: ViewStyle,
    pickerItem: TextStyle,
}

export function UtilStyles(theme: Theme) {
    return StyleSheet.create<IUtilStyles>({
        container: {
            flex: 1,
            paddingHorizontal: 15,
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_400Regular",
        },
        row: {
            flexDirection: "row"
        },
        grow1: {
            flexGrow: 1,
        },
        shrink1: {
            flexShrink: 1,
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
        wHalf: {
            width: "50%",
        },
        btn: {
            padding: 8,
            borderRadius: 8,
        },
        btnPrimary: {
            backgroundColor: theme.colors.primary,
        },
        btnSuccess: {
            backgroundColor: theme.colors.success,
        },
        btnDanger: {
            backgroundColor: theme.colors.danger,
        },
        txt: {
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_400Regular",
        },
        txtCenter: {
            textAlign: "center",
        },
        txtRight: {
            textAlign: "right"
        },
        txtPrimary: {
            color: theme.colors.background,
            textAlign: "center"
        },
        txtSuccess: {
            color: theme.colors.background,
            textAlign: "center"
        },
        txtDanger: {
            color: theme.colors.background,
            textAlign: "center"
        },
        picker: {
            height: 21,
            fontSize: theme.fontSize.small,
        },
        pickerItem: {
            height: 21,
            fontSize: theme.fontSize.small,
        },
    });
}
