import {RouteProp, useRoute} from "@react-navigation/native";
import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {ScrollView, Text, TextInput, View} from "react-native";
import {Field} from "../utils/component/Field";
import {handleUpdate} from "../utils/Utils";
import {ActionParamsList} from "./ActionContextScreen";
import {Action} from "../utils/ActionUtils";
import {Picker} from "@react-native-community/picker";
import StyledText from "../utils/component/StyledText";

// type ActionEditNavigationProp = StackNavigationProp<ActionParamsList, "Edit">;
type ActionEditRouteProp = RouteProp<ActionParamsList, "Edit">;

export interface IProps {
    action: Action;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const route = useRoute<ActionEditRouteProp>();

    const action = route.params.action;

    return (
        <ScrollView style={styles.util.container}>
            <Field label={"Action Name: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={60}
                           value={action.name}
                           onChange={(e) => {
                               action.name = e.nativeEvent.text;
                               context.updateActions(action);
                           }}
                />
            </Field>
            <Field label={"Description: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={400}
                           multiline={true}
                           value={action.desc}
                           onChange={(e) => {
                               action.desc = e.nativeEvent.text;
                               context.updateActions(action);
                           }}
                />
            </Field>
            <Field label={"Group: "}>
                <TextInput style={[styles.field.group]}
                           maxLength={60}
                           value={action.group}
                           onChange={(e) => {
                               action.group = e.nativeEvent.text;
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
                action.contents.map((item) =>
                    <View key={item.key} style={[styles.util.row, styles.field.base]}>
                        <TextInput value={item.field}
                                   style={[styles.field.group, styles.util.grow1, styles.field.groupStart]}
                                   onChange={(e) => {
                                       item.field = e.nativeEvent.text;
                                       action.contents = handleUpdate(action.contents, item);
                                       context.updateActions(action);
                                   }}
                        />
                        <View style={[styles.field.group, styles.field.groupEnd, styles.util.grow1]}>
                            <Picker selectedValue={item.table}
                                    style={[styles.util.picker, styles.util.grow1]}
                                    itemStyle={[styles.util.pickerItem, styles.util.grow1]}
                                    onValueChange={(value) => {
                                        item.table = value as string;
                                        action.contents = handleUpdate(action.contents, item);
                                        context.updateActions(action);
                                    }}>
                                {
                                    context.tables.map((t) =>
                                        <Picker.Item value={t.key} label={t.name} key={t.key}/>
                                    )
                                }
                            </Picker>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}
