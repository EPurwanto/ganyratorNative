import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

export default function () {
    const context = useContext(AppContext);

    return (
        <SafeAreaView style={context.styles.container}>
            <Text>
                Stuff
            </Text>
        </SafeAreaView>
    )
}
