import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import TableListScreen from "./TableListScreen";
import TableEditScreen, {IProps as EditScreenProps} from "./TableEditScreen";
import {getDummyTable} from "../utils/TableUtils";

export type TablesParamList = {
    List: undefined;
    Edit: EditScreenProps;
}

export default function () {
    const Stack = createStackNavigator<TablesParamList>();

    return (
        <Stack.Navigator initialRouteName={"List"}>
            <Stack.Screen name={"List"} component={TableListScreen} options={{title: "Edit Tables"}}/>
            <Stack.Screen name={"Edit"} component={TableEditScreen} options={{title: "Edit"}} initialParams={{table: getDummyTable()}}/>
        </Stack.Navigator>
    )
}
