import {NavigationContainer} from "@react-navigation/native";
import {Button, Picker, StyleProp, Text, View, ViewStyle} from "react-native";
import {StatusBar} from "expo-status-bar";
import AppContext from "../utils/AppContext";
import React, {useContext, useState} from "react";
import App from "../../App";
import styles from "../utils/AppStyles";


export default function () {
    const context = useContext(AppContext);
    const [selected, setSelected] = useState<string>("");

    return (
            <View style={context.styles.container}>
                <StatusBar style="auto" />
                <View style={context.styles.rollArea}>
                    <Text style={context.styles.text}>Session: {context.text}</Text>
                </View>
                <View style={context.styles.btnArea}>
                    <View style={context.styles.rollPickerBtn}>
                        <View style={context.styles.rollPicker}>
                            <Picker selectedValue={selected}
                                    onValueChange={(value, index) => setSelected(value)}>
                                {
                                    Array.from({ length: 30 }, (_, i) => i).map((i) => <Picker.Item key={i} label={i.toString()} value={i}/>)
                                }
                            </Picker>
                        </View>
                        <View style={context.styles.rollBtn}>
                            <Button title={"Set"}
                                    onPress={() => {context.setText(selected)}}/>
                        </View>
                    </View>
                    <View style={context.styles.btn}>
                        <Button title={"Goodbye"}
                                onPress={() => {context.setText("Goodbye")}}/>
                    </View>
                    <View style={context.styles.btn}>
                        <Button title={"G'Day"}
                                onPress={() => {context.setText("G'Day")}}/>
                    </View>
                </View>
            </View>
        )
}
