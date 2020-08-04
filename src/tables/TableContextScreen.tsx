import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import TableListScreen from "./TableListScreen";
import TableEditScreen, {IProps as EditScreenProps} from "./TableEditScreen";
import {createTable, createTableContent, getDummyTable} from "../utils/TableUtils";
import {TouchButton} from "../utils/TouchButton";
import AppStyles from "../styles/AppStyles";
import {handleUpdate} from "../utils/Utils";
import AppContext from "../utils/AppContext";

export type TablesParamList = {
    List: undefined;
    Edit: EditScreenProps;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    const Stack = createStackNavigator<TablesParamList>();

    return (
        <Stack.Navigator initialRouteName={"List"}>
            <Stack.Screen name={"List"}
                          component={TableListScreen}
                          options={{
                              title: "Edit Tables",
                              headerRight: () => (
                                  <TouchButton style={[styles.util.btnPrimary, styles.util.mr15]}
                                               label={"Add"}
                                               labelStyle={styles.util.txtPrimary}
                                               onPress={() => {
                                                   createTable(context.tables).then((table) => {
                                                       context.updateTables(undefined, table);
                                                   });
                                               }}
                                  />
                              )
                          }}/>
            <Stack.Screen name={"Edit"}
                          component={TableEditScreen}
                          options={({route}) => {
                              {
                                  const table = route.params.table;
                                  return {
                                      title: "Edit " + table.name,
                                      headerRight:
                                          () => (
                                              <TouchButton style={[styles.util.btnPrimary, styles.util.mr15]}
                                                           label={"Add"}
                                                           labelStyle={styles.util.txtPrimary}
                                                           onPress={() => {
                                                               createTableContent(table.contents).then((row) => {
                                                                   table.contents = handleUpdate(table.contents, undefined, row);
                                                                   context.updateTables(table);
                                                               });
                                                           }}
                                              />
                                          )
                                  }
                              }
                          }}
                          initialParams={{table: getDummyTable()}}/>
        </Stack.Navigator>
    )
}
