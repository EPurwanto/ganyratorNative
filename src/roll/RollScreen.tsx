import React, {useContext, useState} from "react";
import {FlatList, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import {TouchButton} from "../utils/component/TouchButton";
import {Action, ActionResults, performAction} from "../utils/ActionUtils";
import RollResults from "./RollResults";
import {find, getUniqueId} from "../utils/Utils";
import StyledText from "../utils/component/StyledText";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


export default function () {
    const styles = useContext(AppStyles);
    const [selected, setSelected] = useState("");
    const [results, setResults] = useState([] as ActionResults[])

    const tables = useSelector((state: RootState) => state.tables.items)
    const actions = useSelector((state: RootState) => state.actions.items);

    const tableActions = tables.map((t) => ({
        name: t.name,
        desc: t.desc,
        group: "Tables",
        key: "T_" + t.key,
        contents: [{table: t.key, key: "T_" + t.key}],
    }))
    const useActions = [...actions, ...tableActions];

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
                              tables.length === 0 ?
                                  <View style={[styles.util.row, styles.util.grow1]}>
                                      <MaterialCommunityIcons name="chevron-left" style={[styles.util.helpIcon]} />
                                      <StyledText style={[styles.util.helpText, styles.util.txtLeft]}>Get started by creating some data tables</StyledText>
                                  </View>
                                  :
                                  <StyledText style={[styles.util.helpText, styles.util.grow1]}>Press Roll below to start creating</StyledText>
                          }/>
                <TouchButton style={[styles.util.btnDanger, styles.roll.clearButton]}
                             onPress={() => setResults([])}>
                    <MaterialCommunityIcons name="delete-sweep" style={[styles.util.btnIcon, styles.util.txtDanger]} />
                </TouchButton>
            </View>

            <View style={styles.roll.controlArea}>
                <View style={[styles.field.base, styles.util.row]}>
                    <CustomPicker items={elementToPickerItem(useActions)}
                                  style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}
                                  pickerStyle={[styles.util.grow1]}
                                  itemStyle={[styles.util.grow1]}
                                  prompt={"Select an action to perform"}
                                  selectedValue={selected}
                                  onValueChange={value => setSelected(value)}/>
                    <TouchButton style={[styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn]}
                                 onPress={() => {
                                     const act = find(useActions, selected);
                                     if (!act)
                                     {
                                         console.log("Couldn't find action " + selected);
                                         return;
                                     }
                                     console.log("Starting batch roll: ")

                                     const outcome = performAction(act.name, act.contents, tables, actions);
                                     const id = getUniqueId(results)
                                     outcome.key = id;
                                     // const summary = Array.from(outcome.values).map(([key, value]) => `${key}->${value}`).join();

                                     setResults([outcome, ...results])

                                 }}>
                        <MaterialCommunityIcons name="dice-multiple" style={[styles.util.btnIcon, styles.util.txtPrimary]} />
                    </TouchButton>
                </View>
            </View>
        </View>
    )
}
