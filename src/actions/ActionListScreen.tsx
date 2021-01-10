import React, {useCallback, useContext} from "react";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {CompositeNavigationProp, useFocusEffect, useNavigation} from "@react-navigation/native";
import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import AppStyles from "../styles/AppStyles";
import ListEntry from "../utils/component/ListEntry";
import {Action} from "../utils/ActionUtils";
import {TabPanelNavProp, TabPanelParamList} from "../MainPanel";
import {TouchButton} from "../utils/component/TouchButton";
import StyledText from "../utils/component/StyledText";
import {useDispatch, useSelector} from "react-redux";
import {RootState, Store} from "../store/store";
import {addAction, clearCreatedAction} from "../store/actionSlice";

type ActionListNavigationProp = CompositeNavigationProp<TabPanelNavProp, MaterialTopTabNavigationProp<TabPanelParamList, "Actions">>;

export default function () {
    const dispatch = useDispatch();
    const styles = useContext(AppStyles);
    const navigation = useNavigation<ActionListNavigationProp>();

    const actions = useSelector((state: RootState) => state.actions.items);
    const created = useSelector((state: RootState) => state.actions.createdAction);

    useFocusEffect(
        useCallback(() => {
            if (created) {
                navigation.push("ActionEdit", {actionId: created.key});
                dispatch(clearCreatedAction())
            }
        }, [created])
    )

    return (
        <View style={styles.util.container}>
            <View style={styles.list.base}>
                <FlatList<Action> data={actions}
                                  contentContainerStyle={styles.util.grow1}
                                  renderItem={({item}) =>
                                      <ListEntry title={item.name}
                                                 subTitle={item.desc}
                                                 key={item.key}
                                                 onPress={() => {
                                                     navigation.push("ActionEdit", {actionId: item.key})
                                                 }}/>
                                  }
                                  ListEmptyComponent={
                                      <StyledText style={[styles.util.helpText, styles.util.grow1]}>You have no actions</StyledText>
                                  }/>
            </View>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         onPress={() => {
                             dispatch(addAction())
                         }}/>
        </View>
    )
}
