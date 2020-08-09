import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {colours, fontSize} from "./UtilStyles";

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

export const ListStyles = StyleSheet.create<IListStyles>({
    // ListView Styles
    base: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: fontSize.large,
        fontFamily: "Lato_700Bold",
    },
    item: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: colours.border,
        flexDirection: "row"
    },
    itemTextContainer: {
        flexGrow: 1
    },
    itemTitle: {
        fontSize: fontSize.medium,
        fontFamily: "Lato_700Bold",
    },
    itemSubtitle: {
        fontSize: fontSize.small,
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
