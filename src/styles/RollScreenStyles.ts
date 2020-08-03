import {StyleSheet, ViewStyle} from "react-native";
import {IListStyles} from "./ListStyles";

export interface IRollScreenStyles {
    resultArea: ViewStyle,
    controlArea: ViewStyle,
    picker: ViewStyle,
    pickerBtn: ViewStyle,
    rollBtn: ViewStyle,
}


export const RollScreenStyles = StyleSheet.create<IRollScreenStyles>({
    // Roll Screen styles
    resultArea: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F0F0F0"
    },
    controlArea: {
        backgroundColor: "#D0D0D0"
    },
    picker: {
        flexGrow: 1
    },
    pickerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E0E0E0"
    },
    rollBtn: {
    },
});
