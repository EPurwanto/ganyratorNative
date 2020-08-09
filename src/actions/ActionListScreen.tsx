import React, {useContext} from "react";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import ListEntry from "../utils/component/ListEntry";
import {Action, createAction} from "../utils/ActionUtils";
import {TabPanelNavProp, TabPanelParamList} from "../MainPanel";
import {TouchButton} from "../utils/component/TouchButton";

type ActionListNavigationProp = CompositeNavigationProp<TabPanelNavProp, MaterialTopTabNavigationProp<TabPanelParamList, "Actions">>;

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const navigation = useNavigation<ActionListNavigationProp>();

    return (
        <View style={styles.util.container}>
            <View style={styles.list.base}>
                <FlatList<Action> data={context.actions}
                                  renderItem={({item}) =>
                                      <ListEntry title={item.name}
                                                 subTitle={item.desc}
                                                 key={item.key}
                                                 onPress={() => navigation.push("ActionEdit", {action: item})}
                                      />
                                  }/>
            </View>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         onPress={() => {
                             console.log("creating action");
                             createAction(context.actions).then((action) => {
                                 console.log("Created action " + action.key);
                                 context.updateActions(undefined, action);
                                 navigation.push("ActionEdit", {action: action});
                             });
                         }}/>
        </View>
    )
}
