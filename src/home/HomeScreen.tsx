import {NavigationContainer} from "@react-navigation/native";
import {Button, StyleProp, Text, View, ViewStyle} from "react-native";
import {StatusBar} from "expo-status-bar";
import AppContext from "../utils/AppContext";
import React, {useContext} from "react";
import App from "../../App";


export default function () {
    const context = useContext(AppContext);

    return (
            <View style={context.styles.container}>
                <StatusBar style="auto" />
                <Text>Session: {context.text}</Text>
                <Text>Loaded: {context.loaded ? "true": "false"}</Text>
                <Button title={"Hello"} onPress={() => {context.setText("Hello")}}/>
                <Button title={"Goodbye"} onPress={() => {context.setText("Goodbye")}}/>
                <Button title={"G'Day"} onPress={() => {context.setText("G'Day")}}/>
            </View>
        )
}
