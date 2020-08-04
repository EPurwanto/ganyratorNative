import React, {useContext, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker, Text, TouchableHighlight, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import SessionStorage from "../utils/SessionStorage";
import {TouchButton} from "../utils/TouchButton";


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
                <View style={[styles.field.base, styles.util.row]}>
                    <View style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}>
                        <Picker selectedValue={"3"}
                                prompt={"Pick a number"}
                            // onValueChange={(value, index) => setSelected(value)}
                                style={[styles.util.picker, styles.util.grow1]}
                                itemStyle={[styles.util.pickerItem, styles.util.grow1]}
                        >
                            <Picker.Item label={"Nothing"} value={""}/>
                            {
                                Array.from({ length: 30 }, (_, i) => <Picker.Item key={i} label={i.toString()} value={i}/>)
                            }
                        </Picker>
                    </View>
                    <TouchButton style={[styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                                 label={"Set"}
                                 labelStyle={styles.util.txtPrimary}
                    />
                </View>

                <TouchButton style={[styles.field.base, styles.util.btnPrimary]}
                             label={"Goodbye"}
                             labelStyle={styles.util.txtPrimary}
                />
                <TouchButton style={[styles.field.base, styles.util.btnSuccess]}
                             label={"G'Day"}
                             labelStyle={styles.util.txtPrimary}
                />
                <TouchButton style={[styles.field.base, styles.util.btnDanger]}
                             label={"Clear Session"}
                             labelStyle={styles.util.txtDanger}
                />
            </View>
        </SafeAreaView>
    )
}
