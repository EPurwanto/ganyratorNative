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
        backgroundColor: "#FFFFFF"
    },
    rollArea: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0"
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
    btnArea: {
        backgroundColor: "#D0D0D0"
    },
    btn: {
        marginVertical: 5
    },
    text: {
        flex: 0,
    }
});

export default styles;
