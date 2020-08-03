import {NavigationContainer} from "@react-navigation/native";
import {Button, Picker, StyleProp, Text, View, ViewStyle} from "react-native";
import {StatusBar} from "expo-status-bar";
import AppContext from "../utils/AppContext";
import React, {useContext, useState} from "react";
import App from "../../App";
import styles from "../styles/AppStyles";
import {SafeAreaView} from "react-native-safe-area-context";
import SessionStorage from "../utils/SessionStorage";
import AppStyles from "../styles/AppStyles";


export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const [selected, setSelected] = useState<string>("");

    return (
        <SafeAreaView style={styles.util.container}>
            <View style={styles.roll.resultArea}>
                <Text>Session: {context.text}</Text>
            </View>
            <View style={styles.roll.controlArea}>
                <View style={styles.roll.pickerBtn}>
                    <View style={styles.roll.picker}>
                        <Picker selectedValue={selected}
                                prompt={"Pick a number"}
                                onValueChange={(value, index) => setSelected(value)}>
                            <Picker.Item label={"Nothing"} value={""}/>
                            {
                                Array.from({ length: 30 }, (_, i) => <Picker.Item key={i} label={i.toString()} value={i}/>)
                            }
                        </Picker>
                    </View>
                    <View style={styles.roll.rollBtn}>
                        <Button title={"Set"}
                                onPress={() => {context.setText(selected)}}/>
                    </View>
                </View>
                <View style={styles.field.base}>
                    <Button title={"Goodbye"}
                            onPress={() => {context.setText("Goodbye")}}/>
                </View>
                <View style={styles.field.base}>
                    <Button title={"G'Day"}
                            onPress={() => {context.setText("G'Day")}}/>
                </View>
                <View style={styles.field.base}>
                    <Button title={"Clear Session"}
                            onPress={() => {SessionStorage.Clear().then()}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
