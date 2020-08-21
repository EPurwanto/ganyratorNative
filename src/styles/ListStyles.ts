import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IListStyles {
    base: ViewStyle,
    sectionTitle: TextStyle,
    item: ViewStyle,
    itemTextContainer: ViewStyle,
    itemTitle: TextStyle,
    itemSubtitle: TextStyle,
    itemActionContainer: ViewStyle,
    itemAction: ViewStyle,
}

export function ListStyles(theme: Theme) {
    return StyleSheet.create<IListStyles>({
        // ListView Styles
        base: {
            flexGrow: 1,
            flexShrink: 1,
            marginBottom: 8,
        },
        sectionTitle: {
            fontSize: theme.fontSize.large,
            fontFamily: "Lato_700Bold",
        },
        item: {
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            flexDirection: "row"
        },
        itemTextContainer: {
            flexGrow: 1
        },
        itemTitle: {
            fontSize: theme.fontSize.medium,
            fontFamily: "Lato_700Bold",
        },
        itemSubtitle: {
            fontSize: theme.fontSize.medium,
            marginHorizontal: 10
        },
        itemActionContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        itemAction: {
            borderRadius: 3,
            marginVertical: 3,
            marginHorizontal: 3,
        },
    });
}
