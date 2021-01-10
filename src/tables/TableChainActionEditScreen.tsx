import React, {useCallback, useContext, useState} from "react";
import {ScrollView, Text, View} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";
import {ActionContent} from "../utils/ActionUtils";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import ActionContentEditor from "../actions/ActionContentEditor";
import {find} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";
import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {StackParamList} from "../MainPanel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import StyledText from "../utils/component/StyledText";
import {addChainAction, updateChainAction, updateRow} from "../store/tableSlice"
import {StackNavigationProp} from "@react-navigation/stack";

type TableChainNavigationProp = StackNavigationProp<StackParamList, "TableChainAction">
type TableChainRouteProp = RouteProp<StackParamList, "TableChainAction">;

type Mode = "None" | "Select" | "Create";

export interface IProps {
    tableId: string;
    itemId: string;
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
    const styles = useContext(AppStyles);
    const route = useRoute<TableChainRouteProp>();
    const dispatch = useDispatch();
    const navigation = useNavigation<TableChainNavigationProp>();

    const actions = useSelector((state: RootState) => state.actions.items);
    const tables = useSelector((state: RootState) => state.tables.items);

    const table = find(tables, route.params.tableId);
    const item = find(table?.contents ?? [], route.params.itemId);

    // Figure out initial state
    const [mode, setMode] = useState<Mode>("None");

    useFocusEffect(
        useCallback(() => {
            if (item) {
                let startMode : Mode = "None"
                switch (typeof item.action) {
                    case "string":
                        startMode = "Select";
                        break;
                    case "object":
                        startMode = "Create";
                        break;
                    default:
                        startMode = "None";
                }
                setMode(startMode)
            } else {
                navigation.pop();
            }
        }, [])
    )

    if (!table || !item) {
        console.log(`Couldn't find table content for id's [${route.params.tableId}]->[${route.params.itemId}].`)
        return <StyledText>Something went wrong</StyledText>
    }

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
                    <CustomPicker items={elementToPickerItem(actions)}
                                  style={[styles.field.group]}
                                  prompt={"Select an action to perform"}
                                  selectedValue={actionKey}
                                  onValueChange={value => {
                                      const copy = {...item};
                                      copy.action = value;
                                      dispatch(updateRow(copy));
                                  }}/>
                </View>
            )
            break;
        case "Create":
            const content = (item.action ?? [])  as ActionContent[];
            body = (
                <View style={styles.list.base}>
                    <Text>The following Tables will be rolled upon</Text>
                    <ScrollView style={styles.list.base}>
                        {
                            content.map((actionItem, index) =>
                                <ActionContentEditor field={actionItem.field}
                                                     table={actionItem.table}
                                                     key={actionItem.key}
                                                     onChange={((actionField, actionTable) => {
                                                         const copy = {...actionItem};
                                                         copy.field = actionField;
                                                         copy.table = actionTable;

                                                         dispatch(updateChainAction({
                                                             parent: {
                                                                 tableId: item.parent,
                                                                 tableContentId: item.key,
                                                             },
                                                             row: copy,
                                                         }))
                                                     })}/>
                            )
                        }
                    </ScrollView>
                    <TouchButton style={[styles.util.btnPrimary]}
                                 label={"Add"}
                                 labelStyle={styles.util.txtPrimary}
                                 onPress={() => {
                                     dispatch(addChainAction({
                                         tableId: item.parent,
                                         tableContentId: item.key,
                                     }))
                                 }}/>
                </View>
            )
    }

    return (
        <View style={styles.util.container}>
            <SegmentedControl values={["None", "Select", "Create"]}
                              selectedIndex={modeIndex(mode)}
                              onChange={event => {
                                  const index = event.nativeEvent.selectedSegmentIndex;
                                  const newMode = indexMode(index);

                                  if (mode !== newMode) {
                                      // Clear whenever the selector is moved
                                      const copy = {...item};
                                      copy.action = undefined
                                      dispatch(updateRow(copy))
                                  }
                                  setMode(newMode);
                              }}/>
            {body}
        </View>
    )
}
