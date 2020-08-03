import React, {useContext} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker, Text, TouchableHighlight, View} from "react-native";
import AppStyles from "../styles/AppStyles";

export default function () {
    const styles = useContext(AppStyles);

    return (
        <SafeAreaView style={styles.util.container}>
            {/*<View style={[styles.field.base, styles.util.row]}>*/}
            {/*    <View style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}>*/}
            {/*        <Picker selectedValue={"3"}*/}
            {/*                prompt={"Pick a number"}*/}
            {/*            // onValueChange={(value, index) => setSelected(value)}*/}
            {/*                style={[styles.util.picker, styles.util.grow1]}*/}
            {/*                itemStyle={[styles.util.pickerItem, styles.util.grow1]}*/}
            {/*        >*/}
            {/*            <Picker.Item label={"Nothing"} value={""}/>*/}
            {/*            {*/}
            {/*                Array.from({ length: 30 }, (_, i) => <Picker.Item key={i} label={i.toString()} value={i}/>)*/}
            {/*            }*/}
            {/*        </Picker>*/}
            {/*    </View>*/}
            {/*    <TouchableHighlight style={[styles.util.btn, styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn]}*/}
            {/*        // onPress={() => {context.setText(selected)}}*/}
            {/*    >*/}
            {/*        <View>*/}
            {/*            <Text style={styles.util.txtPrimary}>Set</Text>*/}
            {/*        </View>*/}
            {/*    </TouchableHighlight>*/}
            {/*</View>*/}
        </SafeAreaView>
    );
}
