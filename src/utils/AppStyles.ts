import {StyleSheet, ViewStyle} from "react-native";

export interface IAppStyles {
    container: ViewStyle;
}

const styles = StyleSheet.create<IAppStyles>({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
