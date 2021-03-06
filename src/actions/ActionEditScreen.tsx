import {RouteProp, useRoute} from "@react-navigation/native";
import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {ScrollView, TextInput, View} from "react-native";
import {Field} from "../utils/component/Field";
import {handleUpdate} from "../utils/Utils";
import {Action, createActionContent} from "../utils/ActionUtils";
import StyledText from "../utils/component/StyledText";
import {StackParamList} from "../MainPanel";
import {TouchButton} from "../utils/component/TouchButton";
import ActionContentEditor from "./ActionContentEditor";

// type ActionEditNavigationProp = StackNavigationProp<ActionParamsList, "Edit">;
type ActionEditRouteProp = RouteProp<StackParamList, "ActionEdit">;

export interface IProps {
    action: Action;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const route = useRoute<ActionEditRouteProp>();

    const action = route.params.action;

    return (
        <View style={styles.util.container}>
            <ScrollView style={styles.list.base}>
                <Field label={"Action Name: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={60}
                               value={action.name}
                               onChange={(e) => {
                                   console.log("Name change")
                                   action.name = e.nativeEvent.text;
                                   context.updateActions(action);
                               }}
                    />
                </Field>
                <Field label={"Description: "}>
                    <TextInput style={[styles.util.txt, styles.field.group]}
                               maxLength={400}
                               multiline={true}
                               value={action.desc}
                               onChange={(e) => {
                                   console.log("Description change")
                                   action.desc = e.nativeEvent.text;
                                   context.updateActions(action);
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
                    context.tables.length > 0
                        ?
                        action.contents.map((item) =>
                            <ActionContentEditor field={item.field}
                                                 table={item.table}
                                                 key={item.key}
                                                 onChange={((field, table) => {
                                                     item.field = field;
                                                     item.table = table;
                                                     console.log("Content change")
                                                     action.contents = handleUpdate(action.contents, item);
                                                     context.updateActions(action);
                                                 })}/>
                        )
                        :
                        <StyledText style={[styles.util.helpText, styles.util.grow1]}>You have no tables</StyledText>
                }
            </ScrollView>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         disabled={context.tables.length === 0}
                         onPress={() => {
                             createActionContent(action.contents).then((row) => {
                                 action.contents = handleUpdate(action.contents, undefined, row);
                                 console.log("Add")
                                 context.updateActions(action);
                             });
                         }}/>
        </View>
    )
}
