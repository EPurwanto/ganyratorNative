import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {ScrollView, TextInput, View} from "react-native";
import {createTableContent, Table} from "../utils/TableUtils";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Field} from "../utils/component/Field";
import AppStyles from "../styles/AppStyles";
import {handleUpdate} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";
import StyledText from "../utils/component/StyledText";
import {StackParamList} from "../MainPanel";
import {StackNavigationProp} from "@react-navigation/stack";

type TableEditNavigationProp = StackNavigationProp<StackParamList, "TableEdit">
type TableEditRouteProp = RouteProp<StackParamList, "TableEdit">;

export interface IProps {
    table: Table;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const navigation = useNavigation<TableEditNavigationProp>();
    const route = useRoute<TableEditRouteProp>();

    const table = route.params.table;
    // const contents = [...table.contents, ...table.contents, ...table.contents, ...table.contents]

    return (
        <View style={styles.util.container}>
            <ScrollView style={styles.list.base}>
                <Field label={"Table Name: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={60}
                               value={table.name}
                               onChange={(e) => {
                                   table.name = e.nativeEvent.text;
                                   context.updateTables(table);
                               }}/>
                </Field>
                <Field label={"Description: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={400}
                               multiline={true}
                               value={table.desc}
                               onChange={(e) => {
                                   table.desc = e.nativeEvent.text;
                                   context.updateTables(table);
                               }}/>
                </Field>
                <View style={styles.util.row}>
                    <StyledText style={[styles.field.label]}>
                        Weight
                    </StyledText>
                    <StyledText style={[styles.field.label, styles.util.txtCenter, styles.util.grow1]}>
                        Element
                    </StyledText>
                    <StyledText style={[styles.field.label]}>
                        Action
                    </StyledText>
                </View>
                {
                    table.contents.map((item) => {
                        console.log("Writing row:", item);
                        const buttonStyle = item.action ? styles.util.btnSuccess : styles.util.btnPrimary;
                        const labelStyle = item.action ? styles.util.txtSuccess : styles.util.txtPrimary;
                        const buttonLabel = item.action ? "Yes" : "No";

                        return (
                            <View key={item.key} style={[styles.util.row, styles.field.base]}>
                                <TextInput value={item.weight.toString()}
                                           maxLength={2}
                                           style={[styles.util.txt, styles.util.txtRight, styles.field.group, styles.field.groupStart, styles.util.w55]}
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
                                           style={[styles.util.txt, styles.field.group, styles.util.grow1, styles.field.groupMiddle]}
                                           onChange={(e) => {
                                               item.element = e.nativeEvent.text;
                                               table.contents = handleUpdate(table.contents, item);
                                               context.updateTables(table);
                                           }}
                                />
                                <TouchButton style={[buttonStyle, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                                             onPress={()=>{
                                                 navigation.push("TableChainAction", {
                                                     table: table,
                                                     item: item,
                                                 })
                                             }}
                                             label={buttonLabel}
                                             labelStyle={labelStyle}/>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         onPress={() => {
                             createTableContent(table.contents).then((row) => {
                                 table.contents = handleUpdate(table.contents, undefined, row);
                                 context.updateActions(table);
                             });
                         }}/>
        </View>
    )
}
