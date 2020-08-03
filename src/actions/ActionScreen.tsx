import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import AppStyles from "../styles/AppStyles";

export default function () {
    const styles = useContext(AppStyles);

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Stuff
            </Text>
        </SafeAreaView>
    )
}
