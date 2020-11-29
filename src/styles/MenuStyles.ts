import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IMenuStyles {
    backdrop: ViewStyle,
    overlay: ViewStyle,
    menu: ViewStyle,
    menuItem: ViewStyle,
    confirmOverlay: ViewStyle,
}

export function MenuStyles(theme: Theme) {
    return StyleSheet.create<IMenuStyles>({
        backdrop: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: theme.colors.overlay,
            opacity: theme.colors.overlayOpacity,
        },
        overlay: {
            backgroundColor: theme.colors.background,
            padding: 8,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 100,
        },
        menu: {
            flex: 2,
            marginTop: 68,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
        },
        menuItem: {
            padding: 15,
        },
        confirmOverlay: {

        },
    })
}
