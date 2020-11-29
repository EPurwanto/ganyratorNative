import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "./AppTheme";

export interface IListStyles {
    base: ViewStyle,
    sectionTitle: TextStyle,
    item: ViewStyle,
    itemDivider: ViewStyle,
    itemTextContainer: ViewStyle,
    itemTitle: TextStyle,
    itemSubtitle: TextStyle,
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
        },
        itemDivider: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
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
    });
}
