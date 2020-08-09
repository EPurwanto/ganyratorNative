import React, {useContext, useState} from "react";
import {ScrollView, Text, View} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";
import {ActionContent, createActionContent} from "../utils/ActionUtils";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import ActionContentEditor from "../actions/ActionContentEditor";
import {handleUpdate} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";
import {Table, TableContent} from "../utils/TableUtils";
import {RouteProp, useRoute} from "@react-navigation/native";
import {StackParamList} from "../MainPanel";

type TableChainRouteProp = RouteProp<StackParamList, "TableChainAction">;

type Mode = "None" | "Select" | "Create";

export interface IProps {
    table: Table;
    item: TableContent;
}

function modeIndex(mode: string) {
    switch (mode) {
        case "None":
            return 0;
        case "Select":
            return 1;
        case "Create":
        default:
            return 2;
    }
}

function indexMode(index: number): Mode {
    switch (index) {
        case 0:
            return "None";
        case 1:
            return "Select";
        case 2:
        default:
            return "Create";
    }
}

export default function(props: IProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const route = useRoute<TableChainRouteProp>();

    const table = route.params.table;
    const item = route.params.item;

    console.log(props);

    // Figure out initial state
    let startMode = "None"
    if (item.action) {
        switch (typeof item.action) {
            case "string":
                startMode = "Select";
                break;
            case "object":
                startMode = "Create";
        }
    }
    const [mode, setMode] = useState(startMode);
    console.log(mode);

    // create components for current state
    let body = <View/>;
    switch (mode) {
        case "None":
            body = (
                <View>
                    <Text>Nothing else will happen</Text>
                </View>
            )
            break;
        case "Select":
            const actionKey = item.action as string;
            body = (
                <View>
                    <Text>The following Action will be performed</Text>
                    <CustomPicker items={elementToPickerItem(context.actions)}
                                  style={[styles.field.group]}
                                  prompt={"Select an action to perform"}
                                  selectedValue={actionKey}
                                  onValueChange={value => {
                                      item.action = value;
                                      table.contents = handleUpdate(table.contents, item);
                                      context.updateTables(table);
                                  }}/>
                </View>
            )
            break;
        case "Create":
            const content = (item.action ?? [])  as ActionContent[];
            body = (
                <View>
                    <ScrollView style={styles.list.base}>
                        <Text>The following Tables will be rolled upon</Text>
                        {
                            content.map((actionItem) =>
                                <ActionContentEditor field={actionItem.field}
                                                     table={actionItem.table}
                                                     key={actionItem.key}
                                                     onChange={((actionField, actionTable) => {
                                                         actionItem.field = actionField;
                                                         actionItem.table = actionTable;
                                                         item.action = handleUpdate(content, item);
                                                         table.contents = handleUpdate(table.contents, item);
                                                         context.updateTables(table);
                                                     })}/>
                            )
                        }
                    </ScrollView>
                    <TouchButton style={[styles.util.btnPrimary]}
                                 label={"Add"}
                                 labelStyle={styles.util.txtPrimary}
                                 onPress={() => {
                                     createActionContent(content).then((row) => {
                                         item.action = handleUpdate(content, undefined, row);
                                         table.contents = handleUpdate(table.contents, item);
                                         context.updateTables(table);
                                     });
                                 }}/>
                </View>
            )
    }

    console.log(body);
    return (
        <View style={styles.util.container}>
            <SegmentedControl values={["None", "Select", "Create"]}
                              selectedIndex={modeIndex(mode)}
                              onChange={event => {
                                  const index = event.nativeEvent.selectedSegmentIndex;
                                  const newMode = indexMode(index);

                                  if (mode !== newMode) {
                                      // Clear whenever the selector is moved
                                      item.action = undefined;
                                      table.contents = handleUpdate(table.contents, item);
                                      context.updateTables(table);
                                  }
                                  setMode(newMode);
                              }}/>
            {body}
        </View>
    )
}
