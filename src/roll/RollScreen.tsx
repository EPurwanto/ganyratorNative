import React, {useContext, useState} from "react";
import {FlatList, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import {TouchButton} from "../utils/component/TouchButton";
import {Action, ActionResults, performAction} from "../utils/ActionUtils";
import RollResults from "./RollResults";
import {find, getUniqueId} from "../utils/Utils";
import StyledText from "../utils/component/StyledText";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const [selected, setSelected] = useState("");
    const [results, setResults] = useState([] as ActionResults[])

    const tableActions = context.tables.map<Action>((t) => ({
        name: t.name,
        desc: t.desc,
        group: "Tables",
        key: "T_" + t.key,
        contents: [{table: t.key, key: "T_" + t.key}],
    }))
    const actions = [...context.actions, ...tableActions];

    return (
        <View style={styles.util.container}>
            <View style={styles.roll.resultArea}>
                <FlatList inverted={true}
                          contentContainerStyle={styles.roll.resultList}
                          data={results}
                          renderItem={({item}) =>
                              <RollResults label={item.root} values={item.values} key={item.key}/>
                          }
                          ListEmptyComponent={
                              <StyledText style={[styles.roll.helpText]}>Press Roll below to start creating</StyledText>
                          }/>
                <TouchButton style={[styles.util.btnDanger, styles.roll.clearButton]}
                             onPress={() => setResults([])}>
                    <MaterialCommunityIcons name="delete-sweep" style={[styles.util.btnIcon, styles.util.txtDanger]} />
                </TouchButton>
            </View>

            <View style={styles.roll.controlArea}>
                <View style={[styles.field.base, styles.util.row]}>
                    <CustomPicker items={elementToPickerItem(actions)}
                                  style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}
                                  pickerStyle={[styles.util.grow1]}
                                  itemStyle={[styles.util.grow1]}
                                  prompt={"Select an action to perform"}
                                  selectedValue={selected}
                                  onValueChange={value => setSelected(value)}/>
                    <TouchButton style={[styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn]}
                                 onPress={() => {
                                     const act = find(actions, selected);
                                     if (!act)
                                     {
                                         console.log("Couldn't find action " + selected);
                                         return;
                                     }
                                     console.log("Starting batch roll: ")

                                     const outcome = performAction(act.name, act.contents, context.tables, context.actions);
                                     getUniqueId(results).then((id) => {
                                         outcome.key = id;
                                         // const summary = Array.from(outcome.values).map(([key, value]) => `${key}->${value}`).join();

                                         setResults([outcome, ...results])
                                     })
                                 }}>
                        <MaterialCommunityIcons name="dice-multiple" style={[styles.util.btnIcon, styles.util.txtPrimary]} />
                    </TouchButton>
                </View>

                <TouchButton style={[styles.field.base, styles.util.btnDanger]}
                             label={"Clear Session"}
                             labelStyle={styles.util.txtDanger}
                             onPress={() => {
                                 context.updateActions(undefined, undefined, context.actions);
                                 context.updateTables(undefined, undefined, context.tables);
                             }}/>
            </View>
        </View>
    )
}
