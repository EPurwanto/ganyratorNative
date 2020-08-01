import {StyleSheet, TextStyle, ViewStyle} from "react-native";

export interface IAppStyles {
    container: ViewStyle,
    rollArea: ViewStyle,
    rollPickerBtn: ViewStyle,
    rollPicker: ViewStyle,
    rollBtn: ViewStyle,
    btnArea: ViewStyle,
    btn: ViewStyle,
    text: TextStyle,
}

const styles = StyleSheet.create<IAppStyles>({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    rollArea: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rollPickerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "grey",
    },
    rollPicker: {
        flexGrow: 1
    },
    rollBtn: {
    },
    btnArea: {
    },
    btn: {
        marginVertical: 5
    },
    text: {
        flex: 0,
    }
});

export default styles;
