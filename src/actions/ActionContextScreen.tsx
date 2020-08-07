import ActionEditScreen, {IProps as EditScreenProps} from "../actions/ActionEditScreen";
import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {createStackNavigator} from "@react-navigation/stack";
import {TouchButton} from "../utils/component/TouchButton";
import ActionListScreen from "./ActionListScreen";
import {createAction, createActionContent, getDummyAction} from "../utils/ActionUtils";
import {handleUpdate} from "../utils/Utils";

export type ActionParamsList = {
    List: undefined;
    Edit: EditScreenProps;
}

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    const Stack = createStackNavigator<ActionParamsList>();

    return (
        <Stack.Navigator initialRouteName={"List"}>
            <Stack.Screen name={"List"}
                          component={ActionListScreen}
                          options={{
                              title: "Edit Actions",
                              headerRight: () => (
                                  <TouchButton style={[styles.util.btnPrimary, styles.util.mr15]}
                                               label={"Add"}
                                               labelStyle={styles.util.txtPrimary}
                                               onPress={() => {
                                                   console.log("creating action");
                                                   createAction(context.actions).then((action) => {
                                                       console.log("Created " + action.key);
                                                       context.updateActions(undefined, action);
                                                   });
                                               }}
                                  />
                              )
                          }}/>
            <Stack.Screen name={"Edit"}
                          component={ActionEditScreen}
                          options={({route}) => {
                              {
                                  const action = route.params.action;
                                  return {
                                      title: "Edit " + action.name,
                                      headerRight:
                                          () => (
                                              <TouchButton style={[styles.util.btnPrimary, styles.util.mr15]}
                                                           label={"Add"}
                                                           labelStyle={styles.util.txtPrimary}
                                                           onPress={() => {
                                                               createActionContent(action.contents).then((row) => {
                                                                   action.contents = handleUpdate(action.contents, undefined, row);
                                                                   context.updateActions(action);
                                                               });
                                                           }}
                                              />
                                          )
                                  }
                              }
                          }}
                          initialParams={{action: getDummyAction()}}/>
        </Stack.Navigator>
    )
}
