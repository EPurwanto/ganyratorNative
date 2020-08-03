import React, {useContext, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker, Text, TouchableHighlight, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import SessionStorage from "../utils/SessionStorage";


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
                    <TouchableHighlight style={[styles.util.btn, styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                        // onPress={() => {context.setText(selected)}}
                    >
                        <View>
                            <Text style={styles.util.txtPrimary}>Set</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={[styles.field.base, styles.util.btn, styles.util.btnPrimary]}>
                    <Text style={styles.util.txtPrimary}>Goodbye</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.field.base, styles.util.btn, styles.util.btnSuccess]}>
                    <Text style={styles.util.txtSuccess}>G'Day</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.field.base, styles.util.btn, styles.util.btnDanger]}
                                    onPress={() => SessionStorage.Clear()}
                >
                    <Text style={styles.util.txtDanger}>Clear Session</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}
