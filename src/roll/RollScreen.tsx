import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Picker, ScrollView, Text, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import SessionStorage from "../utils/SessionStorage";
import {TouchButton} from "../utils/component/TouchButton";
import {ActionResults, performAction} from "../utils/ActionUtils";
import RollResults from "./RollResults";
import {find, getUniqueId} from "../utils/Utils";


export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const [selected, setSelected] = useState(context.tables.length > 0 ? context.tables[0].key : "");
    const [results, setResults] = useState([] as ActionResults[])

    return (
        <SafeAreaView style={styles.util.container}>
            <Text style={styles.roll.heading}>gANYrator</Text>
            <View style={styles.roll.resultArea}>
                <FlatList inverted={true}
                          contentContainerStyle={styles.roll.resultList}
                          data={results}
                          renderItem={({item}) =>
                              <RollResults label={item.root} values={item.values} key={item.key}/>
                          }
                          ListEmptyComponent={
                              <Text style={styles.roll.helpText}>Press Roll below to start creating</Text>
                          }/>
                <TouchButton style={[styles.util.btnDanger, styles.roll.clearButton]}
                             label={"Clear"}
                             labelStyle={styles.util.txtDanger}
                             onPress={() => setResults([])}/>
            </View>

            <View style={styles.roll.controlArea}>
                <View style={[styles.field.base, styles.util.row]}>
                    <View style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}>
                        <Picker selectedValue={selected}
                                prompt={"TODO Pick a better prompt"}
                                onValueChange={(value) => setSelected(value)}
                                style={[styles.util.picker, styles.util.grow1]}
                                itemStyle={[styles.util.pickerItem, styles.util.grow1]}>
                            {
                                context.tables.length > 0 ?
                                    context.tables.map((table) =>
                                        <Picker.Item label={table.name} value={table.key} key={table.key}/>
                                    ):
                                    <Picker.Item label={"Nothing"} value={""}/>
                            }
                        </Picker>
                    </View>
                    <TouchButton style={[styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                                 label={"Roll"}
                                 labelStyle={styles.util.txtPrimary}
                                 onPress={() => {
                                     const outcome = performAction(find(context.tables, selected)!.name, [{field: "result", table: selected, key: ""}], context.tables, context.actions);
                                     getUniqueId(results).then((id) => {
                                         outcome.key = id;
                                         setResults([outcome, ...results])
                                     })
                                 }}/>
                </View>

                <TouchButton style={[styles.field.base, styles.util.btnDanger]}
                             label={"Clear Session"}
                             labelStyle={styles.util.txtDanger}
                             onPress={() => SessionStorage.Clear()}/>
            </View>
        </SafeAreaView>
    )
}
