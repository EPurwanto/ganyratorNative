import React, {useCallback, useContext} from "react";
import {ScrollView, TextInput, View} from "react-native";
import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {Field} from "../utils/component/Field";
import AppStyles from "../styles/AppStyles";
import {find} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";
import StyledText from "../utils/component/StyledText";
import {StackParamList} from "../MainPanel";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import {addRow, clearCreatedTable, updateRow, updateTable} from '../store/tableSlice'
import {RootState} from "../store/store";

type TableEditNavigationProp = StackNavigationProp<StackParamList, "TableEdit">
type TableEditRouteProp = RouteProp<StackParamList, "TableEdit">;

export interface IProps {
    tableId: string;
}

export default function () {
    const dispatch = useDispatch();
    const styles = useContext(AppStyles);
    const navigation = useNavigation<TableEditNavigationProp>();
    const route = useRoute<TableEditRouteProp>();

    const tables = useSelector((state: RootState) => state.tables.items);
    const created = useSelector((state: RootState) => state.tables.createdTable)

    const table = find(tables, route.params.tableId);

    useFocusEffect(
        useCallback(() => {
            if (!table) {
                navigation.pop();
            }
        }, [table])
    );

    useFocusEffect(
        useCallback(() => {
            if (created) {
                dispatch(clearCreatedTable())
                navigation.replace("TableEdit", {tableId: created.key});
            }
        }, [created])
    );

    if (!table) {
        return null
    }

    return (
        <View style={styles.util.container}>
            <ScrollView style={styles.list.base}>
                <Field label={"Table Name: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={60}
                               value={table.name}
                               onChange={(e) => {
                                   const copy = {...table}
                                   copy.name = e.nativeEvent.text;
                                   dispatch(updateTable(copy))
                               }}/>
                </Field>
                <Field label={"Description: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={400}
                               multiline={true}
                               value={table.desc}
                               onChange={(e) => {
                                   const copy = {...table}
                                   copy.desc = e.nativeEvent.text;
                                   dispatch(updateTable(copy))
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
                                               const copy = {...item};
                                               if (e.nativeEvent.text) {
                                                   copy.weight = parseInt(e.nativeEvent.text);
                                               } else {
                                                   copy.weight = 0;
                                               }
                                               dispatch(updateRow(copy))
                                           }}
                                />
                                <TextInput value={item.element.toString()}
                                           style={[styles.util.txt, styles.field.group, styles.util.grow1, styles.field.groupMiddle]}
                                           onChange={(e) => {
                                               const copy = {...item};
                                               copy.element = e.nativeEvent.text;
                                               dispatch(updateRow(copy))
                                           }}
                                />
                                <TouchButton style={[buttonStyle, styles.field.group, styles.field.groupEnd, styles.field.btn, styles.util.w55]}
                                             onPress={()=>{
                                                 navigation.push("TableChainAction", {
                                                     tableId: table.key,
                                                     itemId: item.key,
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
                             dispatch(addRow({
                                 tableId: table.key,
                             }))
                         }}/>
        </View>
    )
}
