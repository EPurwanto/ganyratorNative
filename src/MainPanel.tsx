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
import {Image, Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import {clone, getUniqueId} from "./utils/Utils";
import {MaterialIcons} from '@expo/vector-icons';
import {Overlay} from "./utils/component/Overlay";
import {ConfirmOverlay} from "./utils/component/ConfirmOverlay";
import ListEntry from "./utils/component/ListEntry";
import MainMenu from "./menu/MainMenu";

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

    const [menuVisible, setMenuVisible] = useState(false);

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
                                                   onPress={() => {
                                                       setMenuVisible(!menuVisible);
                                                   }}>
                                          <MaterialIcons name="menu" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <MainMenu visible={menuVisible} onClose={() => setMenuVisible(false)}/>
                                  </View>
                          }}/>
            <Stack.Screen name={"ActionEdit"}
                          component={ActionEditScreen}
                          options={({ navigation, route}) => ({
                              headerRight: () => (
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       getUniqueId(context.actions).then((id) => {
                                                           const copy = clone(route.params.action);
                                                           copy.name = "Copy of " + copy.name;
                                                           copy.key = id;
                                                           context.updateActions(undefined, copy);
                                                           navigation.pop();
                                                           navigation.push("ActionEdit", {action: copy})
                                                       })
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
                                  </View>
                              )
                          })}/>
            <Stack.Screen name={"TableEdit"}
                          component={TableEditScreen}
                          options={({ navigation, route}) => ({
                              headerRight: () => (
                                  <View style={[styles.util.row, styles.util.mr15]}>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       getUniqueId(context.tables).then((id) => {
                                                           const copy = clone(route.params.table);
                                                           copy.name = "Copy of " + copy.name;
                                                           copy.key = id;
                                                           context.updateTables(undefined, copy);
                                                           navigation.pop();
                                                           navigation.push("TableEdit", {table: copy})
                                                       })
                                                   }}>
                                          <MaterialIcons name="content-copy" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                      <TouchButton style={[]}
                                                   onPress={() => {
                                                       context.updateTables(undefined, undefined, route.params.table);
                                                       navigation.pop();
                                                   }}>
                                          <MaterialIcons name="delete" style={[styles.util.btnIcon]}/>
                                      </TouchButton>
                                  </View>
                              )
                          })}/>
            <Stack.Screen name={"TableChainAction"}
                          component={TableChainActionEditScreen}
                          options={({ navigation, route}) => ({
                              title: `Action: ${route.params.item.element}`,
                          })}/>
        </Stack.Navigator>
    )
}
