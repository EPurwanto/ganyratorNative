import React, {useContext, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, ScrollView, Text, View} from "react-native";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import SessionStorage from "../utils/SessionStorage";
import {TouchButton} from "../utils/component/TouchButton";
import {Action, ActionResults, groupActions, performAction} from "../utils/ActionUtils";
import RollResults from "./RollResults";
import {find, getUniqueId} from "../utils/Utils";
import {Picker} from "@react-native-community/picker";
import {act} from "react-dom/test-utils";
import StyledText from "../utils/component/StyledText";
import CustomPicker from "../utils/component/CustomPicker";


export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const [selected, setSelected] = useState(context.tables.length > 0 ? context.tables[0].key : "");
    const [results, setResults] = useState([] as ActionResults[])

    const tableActions = context.tables.map<Action>((t) => ({
        name: t.name,
        desc: t.desc,
        group: "Tables",
        key: "T_" + t.key,
        contents: [{table: t.key, key: "T_" + t.key}],
    }))
    const actions = [...context.actions, ...tableActions];

    return <SafeAreaView style={styles.util.container}>
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
                         label={"Clear"}
                         labelStyle={styles.util.txtDanger}
                         onPress={() => setResults([])}/>
        </View>

        <View style={styles.roll.controlArea}>
            <View style={[styles.field.base, styles.util.row]}>
                <CustomPicker items={actions.map((a) => ({key: a.key, label: a.name, value: a.key}))}
                              style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}
                              pickerStyle={[styles.util.grow1]}
                              itemStyle={[styles.util.grow1]}
                              prompt={"Select an action to perform"}
                              selectedValue={selected}
                              onValueChange={value => setSelected(value)}/>
                {/*<View style={[styles.field.group, styles.field.groupStart, styles.util.grow1]}>*/}
                {/*    <Picker selectedValue={selected}*/}
                {/*            prompt={"TODO Pick a better prompt"}*/}
                {/*            onValueChange={(itemValue, itemIndex) => setSelected(itemValue as string)}*/}
                {/*            style={[styles.util.picker, styles.util.grow1]}*/}
                {/*            itemStyle={[styles.util.pickerItem, styles.util.grow1]}>*/}
                {/*        {*/}
                {/*            actions.length > 0 ?*/}
                {/*                actions.map((a) =>*/}
                {/*                    <Picker.Item label={a.name} value={a.key} key={a.key}/>*/}
                {/*                ):*/}
                {/*                <Picker.Item label={"Nothing"} value={""}/>*/}
                {/*        }*/}
                {/*    </Picker>*/}
                {/*</View>*/}
                <TouchButton style={[styles.util.btnPrimary, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                             label={"Roll"}
                             labelStyle={styles.util.txtPrimary}
                             onPress={() => {
                                 const act = find(actions, selected)!;
                                 const outcome = performAction(act.name, act.contents, context.tables, context.actions);
                                 getUniqueId(results).then((id) => {
                                     outcome.key = id;
                                     setResults([outcome, ...results])
                                 })
                             }}/>
            </View>

            <TouchButton style={[styles.field.base, styles.util.btnDanger]}
                         label={"Clear Session"}
                         labelStyle={styles.util.txtDanger}
                         onPress={() => {
                             context.updateActions(undefined, undefined, context.actions);
                             context.updateTables(undefined, undefined, context.tables);
                         }}/>
        </View>
    </SafeAreaView>
}
