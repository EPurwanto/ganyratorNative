import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {ScrollView, Text, TextInput, View} from "react-native";
import {Table} from "../utils/TableUtils";
import {StackNavigationProp} from "@react-navigation/stack";
import {TablesParamList} from "./TableContextScreen";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Field} from "../utils/component/Field";
import AppStyles from "../styles/AppStyles";
import {handleUpdate} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";

type TableEditNavigationProp = StackNavigationProp<TablesParamList, "Edit">;
type TableEditRouteProp = RouteProp<TablesParamList, "Edit">;

export interface IProps {
    table: Table;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const route = useRoute<TableEditRouteProp>();
    const navigation = useNavigation<TableEditNavigationProp>();

    const table = route.params.table;
    // const contents = [...table.contents, ...table.contents, ...table.contents, ...table.contents]

    return (
        <ScrollView style={styles.util.container}>
            <Field label={"Table Name: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={60}
                           value={table.name}
                           onChange={(e) => {
                               table.name = e.nativeEvent.text;
                               context.updateTables(table);
                           }}
                />
            </Field>
            <Field label={"Description: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={400}
                           multiline={true}
                           value={table.desc}
                           onChange={(e) => {
                               table.desc = e.nativeEvent.text;
                               context.updateTables(table);
                           }}
                />
            </Field>
            <Field label={"Group: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={60}
                           value={table.group}
                           onChange={(e) => {
                               table.group = e.nativeEvent.text;
                               context.updateActions(table);
                           }}
                />
            </Field>
            <View style={styles.util.row}>
                <Text style={styles.field.label}>
                    Weight
                </Text>
                <Text style={[styles.field.label, styles.util.txtCenter, styles.util.grow1]}>
                    Element
                </Text>
                <Text style={styles.field.label}>
                    Action
                </Text>
            </View>
            {
                table.contents.map((item) =>
                    <View key={item.key} style={[styles.util.row, styles.field.base]}>
                        <TextInput value={item.weight.toString()}
                                   maxLength={2}
                                   style={[styles.field.group, styles.field.groupStart, styles.util.txtRight, styles.util.w55]}
                                   keyboardType={"number-pad"}
                                   onChange={(e) => {
                                       if (e.nativeEvent.text) {
                                           item.weight = parseInt(e.nativeEvent.text);
                                           table.contents = handleUpdate(table.contents, item);
                                           context.updateTables(table);
                                       }
                                   }}
                        />
                        <TextInput value={item.element.toString()}
                                   style={[styles.field.group, styles.util.grow1, styles.field.groupMiddle]}
                                   onChange={(e) => {
                                       item.element = e.nativeEvent.text;
                                       table.contents = handleUpdate(table.contents, item);
                                       context.updateTables(table);
                                   }}
                        />
                        <TouchButton style={[styles.util.btnSuccess, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                                     onPress={()=>{}}
                                     label={"Yes"}
                                     labelStyle={styles.util.txtSuccess}/>
                    </View>
                )
            }
        </ScrollView>
    )
}