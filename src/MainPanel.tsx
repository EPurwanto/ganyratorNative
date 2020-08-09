import React, {useContext} from "react";
import RollScreen from "./roll/RollScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import TableListScreen from "./tables/TableListScreen";
import ActionListScreen from "./actions/ActionListScreen";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import ActionEditScreen, {IProps as ActionEditProps} from "./actions/ActionEditScreen";
import {TouchButton} from "./utils/component/TouchButton";
import TableEditScreen, {IProps as TableEditProps} from "./tables/TableEditScreen";
import AppStyles from "./styles/AppStyles";
import AppContext from "./utils/AppContext";

export type TabPanelParamList = {
    Tables: undefined;
    Roll: undefined;
    Actions: undefined;
}
export type TabPanelNavProp = StackNavigationProp<StackParamList, "TabPanel">;

export interface TabPanelProps {

}

function TabPanel(props: TabPanelProps) {
    const Tab = createMaterialTopTabNavigator<TabPanelParamList>();

    return (
        <Tab.Navigator initialRouteName={"Roll"}
                       style={{backgroundColor: "#000000"}}
                       swipeEnabled={true}
            // tabBarPosition={"bottom"}
                       backBehavior={"initialRoute"}>
            <Tab.Screen name={"Tables"} component={TableListScreen} options={{ title: 'Tables' }}/>
            <Tab.Screen name={"Roll"} component={RollScreen} options={{ title: 'Roll' }}/>
            <Tab.Screen name={"Actions"} component={ActionListScreen} options={{ title: 'Actions' }}/>
        </Tab.Navigator>
    )
}

export type StackParamList = {
    TabPanel: TabPanelProps;
    ActionEdit: ActionEditProps;
    TableEdit: TableEditProps;
}

export interface StackPanelProps {

}

export default function StackPanel(props: StackPanelProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const Stack = createStackNavigator<StackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name={"TabPanel"}
                          component={TabPanel}
                          options={{
                              headerTitle: "gANYrator",
                              headerTitleStyle: styles.roll.heading,
                          }}/>
            <Stack.Screen name={"ActionEdit"}
                          component={ActionEditScreen}
                          options={({ navigation, route}) => ({
                              headerRight: () => (
                                  <TouchButton style={[styles.util.btnDanger, styles.util.mr15]}
                                               label={"Delete"}
                                               labelStyle={styles.util.txtDanger}
                                               onPress={() => {
                                                   context.updateActions(undefined, undefined, route.params.action);
                                                   navigation.pop();
                                               }}/>
                              )
                          })}/>
            <Stack.Screen name={"TableEdit"}
                          component={TableEditScreen}
                          options={({ navigation, route}) => ({
                              headerRight: () => (
                                  <TouchButton style={[styles.util.btnDanger, styles.util.mr15]}
                                               label={"Delete"}
                                               labelStyle={styles.util.txtDanger}
                                               onPress={() => {
                                                   context.updateTables(undefined, undefined, route.params.table);
                                                   navigation.pop();
                                               }}/>
                              )
                          })}/>
        </Stack.Navigator>
    )
}
