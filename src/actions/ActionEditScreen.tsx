import {RouteProp, useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import React, {useCallback, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {ScrollView, TextInput, View} from "react-native";
import {Field} from "../utils/component/Field";
import {find} from "../utils/Utils";
import StyledText from "../utils/component/StyledText";
import {StackParamList} from "../MainPanel";
import {TouchButton} from "../utils/component/TouchButton";
import ActionContentEditor from "./ActionContentEditor";
import {useDispatch, useSelector} from "react-redux";
import {StackNavigationProp} from "@react-navigation/stack";
import {addRow, clearCreatedAction, updateAction, updateRow} from "../store/actionSlice";
import {RootState} from "../store/store";

type ActionEditNavigationProp = StackNavigationProp<StackParamList, "ActionEdit">;
type ActionEditRouteProp = RouteProp<StackParamList, "ActionEdit">;

export interface IProps {
    actionId: string;
}

export default function () {
    const styles = useContext(AppStyles);
    const dispatch = useDispatch();
    const route = useRoute<ActionEditRouteProp>();
    const navigation = useNavigation<ActionEditNavigationProp>();

    const actions = useSelector((state: RootState) => state.actions.items);
    const tables = useSelector((state: RootState) => state.tables.items);
    const created = useSelector((state: RootState) => state.actions.createdAction);

    const action = find(actions, route.params.actionId);

    useFocusEffect(
        useCallback(() => {
            if (!action) {
                navigation.pop();
            }
        }, [action])
    );

    useFocusEffect(
        useCallback(() => {
            if (created) {
                navigation.replace("ActionEdit", {actionId: created.key});
                dispatch(clearCreatedAction())
            }
        }, [created])
    );

    if (!action) {
        return null;
    }

    return (
        <View style={styles.util.container}>
            <ScrollView style={styles.list.base}>
                <Field label={"Action Name: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={60}
                               value={action.name}
                               onChange={(e) => {
                                   const copy = {...action};
                                   copy.name = e.nativeEvent.text;
                                   dispatch(updateAction(copy));
                               }}
                    />
                </Field>
                <Field label={"Description: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={400}
                               multiline={true}
                               value={action.desc}
                               onChange={(e) => {
                                   const copy = {...action};
                                   copy.desc = e.nativeEvent.text;
                                   dispatch(updateAction(copy));
                               }}
                    />
                </Field>
                <View style={styles.util.row}>
                    <StyledText style={[styles.field.label, styles.util.grow1]}>
                        Field Name
                    </StyledText>
                    <StyledText style={[styles.field.label]}>
                        Table
                    </StyledText>
                </View>
                {
                    tables.length > 0
                        ?
                        action.contents.map((item) =>
                            <ActionContentEditor field={item.field}
                                                 table={item.table}
                                                 key={item.key}
                                                 onChange={((field, table) => {
                                                     const copy = {...item};
                                                     copy.field = field;
                                                     copy.table = table;

                                                     dispatch(updateRow({
                                                         parent: {
                                                             actionId: action.key,
                                                         },
                                                         row: copy,
                                                     }))
                                                 })}/>
                        )
                        :
                        <StyledText style={[styles.util.helpText, styles.util.grow1]}>You have no tables</StyledText>
                }
            </ScrollView>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         disabled={tables.length === 0}
                         onPress={() => {
                             dispatch(addRow({
                                 actionId: action.key
                             }))
                         }}/>
        </View>
    )
}
