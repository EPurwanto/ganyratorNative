import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IUtilStyles {
    container: ViewStyle,
    row: ViewStyle,
    centerContent: ViewStyle,
    flex1: ViewStyle,
    grow1: ViewStyle,
    shrink1: ViewStyle,
    p0: ViewStyle,
    pv0: ViewStyle,
    m0: ViewStyle,
    mr15: ViewStyle,
    w55: ViewStyle,
    wHalf: ViewStyle,
    btn: ViewStyle,
    btn_disabled: ViewStyle,
    btnPrimary: ViewStyle,
    btnSuccess: ViewStyle,
    btnDanger: ViewStyle,
    btnIcon: TextStyle,
    txt: TextStyle,
    txtLeft: TextStyle,
    txtCenter: TextStyle,
    txtRight: TextStyle,
    txtPrimary: ViewStyle,
    txtSuccess: ViewStyle,
    txtDanger: ViewStyle,
    helpText: TextStyle,
    helpIcon: TextStyle,
    picker: ViewStyle,
    pickerItem: TextStyle,
    para: TextStyle,
}

export function UtilStyles(theme: Theme) {
    return StyleSheet.create<IUtilStyles>({
        container: {
            flex: 1,
            padding: 15,
            paddingTop: 0,
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_400Regular",
        },
        row: {
            flexDirection: "row"
        },
        centerContent: {
            alignContent: "center",
            justifyContent: "center",
        },
        flex1: {
            flex: 1,
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
        btn_disabled: {
            backgroundColor: theme.colors.disabled,
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
        btnIcon: {
            fontSize: theme.fontSize.large,
            fontFamily: "Lato_400Regular",
        },
        txt: {
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_400Regular",
        },
        txtLeft: {
            textAlign: "left"
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
        helpText: {
            fontSize: theme.fontSize.large,
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
        },
        helpIcon: {
            fontSize: theme.fontSize.title,
            textAlignVertical: "center",
        },
        picker: {
            height: 21,
            fontSize: theme.fontSize.small,
        },
        pickerItem: {
            height: 21,
            fontSize: theme.fontSize.small,
        },
        para: {
            marginVertical: 8,
        },
    });
}
