import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {ScrollView, Text, TextInput, View} from "react-native";
import {Field} from "../utils/component/Field";
import {handleUpdate} from "../utils/Utils";
import {TouchButton} from "../utils/component/TouchButton";
import {ActionParamsList} from "./ActionContextScreen";
import {Action} from "../utils/ActionUtils";

type ActionEditNavigationProp = StackNavigationProp<ActionParamsList, "Edit">;
type ActionEditRouteProp = RouteProp<ActionParamsList, "Edit">;

export interface IProps {
    action: Action;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const route = useRoute<ActionEditRouteProp>();
    const navigation = useNavigation<ActionEditNavigationProp>();

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
                        <TextInput value={item.table}
                                   style={[styles.field.group, styles.util.grow1, styles.field.groupEnd]}
                                   onChange={(e) => {
                                       item.table = e.nativeEvent.text;
                                       action.contents = handleUpdate(action.contents, item);
                                       context.updateActions(action);
                                   }}
                        />
                    </View>
                )
            }
        </ScrollView>
    )
}