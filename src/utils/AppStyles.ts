import {StyleSheet, TextStyle, ViewStyle} from "react-native";

export interface IAppStyles {
    container: ViewStyle,
    btn: ViewStyle,
    text: TextStyle,

    listSection: ViewStyle,
    listSectionTitle: TextStyle,
    listItem: ViewStyle,
    listItemTextContainer: ViewStyle,
    listItemTitle: TextStyle,
    listItemSubtitle: TextStyle,
    listItemActionContainer: ViewStyle,
    listItemAction: ViewStyle,

    rollArea: ViewStyle,
    btnArea: ViewStyle,
    rollPickerBtn: ViewStyle,
    rollPicker: ViewStyle,
    rollBtn: ViewStyle,
}

const fontSize = {
    small: 14,
    medium: 20,
    large: 25,
};

export const highlightUnderlay = "#DDDDDD";

const styles = StyleSheet.create<IAppStyles>({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF"
    },
    btn: {
        marginVertical: 5
    },
    text: {
        flex: 0,
        fontSize: fontSize.medium,
    },

    // ListView Styles
    listSection: {

    },
    listSectionTitle: {
        fontSize: fontSize.large,
        fontWeight: "bold",
    },
    listItem: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        flexDirection: "row"
    },
    listItemTextContainer: {
        flexGrow: 1
    },
    listItemTitle: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
    listItemSubtitle: {
        fontSize: fontSize.small,
        marginHorizontal: 10
    },
    listItemActionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    listItemAction: {
        borderRadius: 3,
        marginVertical: 3,
        marginHorizontal: 3,
    },

    // Roll Screen styles
    rollArea: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0"
    },
    btnArea: {
        backgroundColor: "#D0D0D0"
    },
    rollPickerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E0E0E0"
    },
    rollPicker: {
        flexGrow: 1
    },
    rollBtn: {
    },
});

export default styles;
