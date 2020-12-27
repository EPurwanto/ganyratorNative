import React, {useContext, useState} from "react";
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
import TableChainActionEditScreen, {IProps as TableChainProps} from "./tables/TableChainActionEditScreen";
import {Image, View} from "react-native";
import {clone, find, getUniqueId} from "./utils/Utils";
import {MaterialIcons} from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {cloneTable, deleteTable} from "./store/tableSlice";

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
    TableChainAction: TableChainProps;
}

export interface StackPanelProps {

}

export default function StackPanel(props: StackPanelProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const Stack = createStackNavigator<StackParamList>();
    const dispatch = useDispatch();

    return (
        <Stack.Navigator>
            <Stack.Screen name={"TabPanel"}
                          component={TabPanel}
                          options={{
                              headerTitle: "gANYrator",
                              headerTitleStyle: styles.roll.heading,
                              headerLeft: (props) =>
                                  <Image source={require("./assets/images/gANYrator_Icon.png")} style={{width: 50, height:50}}/>,
                              headerLeftContainerStyle: {marginLeft: 15},
                              headerRight: (props) =>
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => context.showMenu(true)}>
                                          <MaterialIcons name="menu" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                  </View>
                          }}/>
            <Stack.Screen name={"ActionEdit"}
                          component={ActionEditScreen}
                          options={({ navigation, route}) => ({
                              title: "Edit Action",
                              headerRight: () => (
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       const id = getUniqueId(context.actions);
                                                       const copy = clone(route.params.action);
                                                       copy.name = "Copy of " + copy.name;
                                                       copy.key = id;
                                                       context.updateActions(undefined, copy);
                                                       navigation.pop();
                                                       navigation.push("ActionEdit", {action: copy})
                                                   }}>
                                          <MaterialIcons name="content-copy" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       context.updateActions(undefined, undefined, route.params.action);
                                                       navigation.pop();
                                                   }}>
                                          <MaterialIcons name="delete" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <TouchButton style={[]}
                                                   onPress={() => context.showMenu(true)}>
                                          <MaterialIcons name="menu" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                  </View>
                              )
                          })}/>
            <Stack.Screen name={"TableEdit"}
                          component={TableEditScreen}
                          options={({ navigation, route}) => ({
                              title: "Edit Table",
                              headerRight: () => (
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       dispatch(cloneTable({
                                                           tableId: route.params.tableId
                                                       }))
                                                   }}>
                                          <MaterialIcons name="content-copy" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       dispatch(deleteTable({
                                                           tableId: route.params.tableId
                                                       }))
                                                       navigation.pop();
                                                   }}>
                                          <MaterialIcons name="delete" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <TouchButton style={[]}
                                                   onPress={() => context.showMenu(true)}>
                                          <MaterialIcons name="menu" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                  </View>
                              )
                          })}/>
            <Stack.Screen name={"TableChainAction"}
                          component={TableChainActionEditScreen}
                          options={({ navigation, route}) => ({
                              title: `Edit Chain Action`,
                              headerRight: (props) =>
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => context.showMenu(true)}>
                                          <MaterialIcons name="menu" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                  </View>
                          })}/>
        </Stack.Navigator>
    )
}
