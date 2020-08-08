import React from "react";
import RollScreen from "./roll/RollScreen";
import {createMaterialTopTabNavigator, MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import TableListScreen from "./tables/TableListScreen";
import ActionListScreen from "./actions/ActionListScreen";
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {StackParamList} from "../App";

export interface IProps {
}

export type MainPanelParamList = {
    Tables: undefined;
    Roll: undefined;
    Actions: undefined;
}
export type MainPanelNavProp = StackNavigationProp<StackParamList, "MainPanel">;

export default function(props: IProps) {
    const Tab = createMaterialTopTabNavigator<MainPanelParamList>();

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
