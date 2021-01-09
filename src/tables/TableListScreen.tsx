import React, {useCallback, useContext} from "react";
import AppContext from "../utils/AppContext";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {Table} from "../utils/TableUtils";
import ListEntry from "../utils/component/ListEntry";
import {CompositeNavigationProp, useNavigation, useFocusEffect} from "@react-navigation/native";
import AppStyles from "../styles/AppStyles";
import {TabPanelNavProp, TabPanelParamList} from "../MainPanel";
import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import {TouchButton} from "../utils/component/TouchButton";
import StyledText from "../utils/component/StyledText";
import {useDispatch, useSelector} from "react-redux";
import {addTable, clearCreatedTable} from "../store/tableSlice";
import {RootState} from "../store/store";

type TableListNavigationProp = CompositeNavigationProp<TabPanelNavProp, MaterialTopTabNavigationProp<TabPanelParamList, "Tables">>;

export default function () {
    const dispatch = useDispatch();
    const styles = useContext(AppStyles);
    const navigation = useNavigation<TableListNavigationProp>();

    const tables = useSelector((state: RootState) => state.tables.items)
    const created = useSelector((state: RootState) => state.tables.createdTable)

    useFocusEffect(
        useCallback(() => {
            if (created) {
                dispatch(clearCreatedTable())
                navigation.push("TableEdit", {tableId: created.key});
            }
        }, [created])
    );

    return (
        <View style={styles.util.container}>
            <View style={styles.list.base}>
                <FlatList<Table> data={tables}
                                 contentContainerStyle={styles.util.grow1}
                                 renderItem={({item}) =>
                                     <ListEntry title={item.name}
                                                subTitle={item.desc}
                                                key={item.key}
                                                onPress={() => navigation.push("TableEdit", {tableId: item.key})}
                                     />
                                 }
                                 ListEmptyComponent={
                                     <StyledText style={[styles.util.helpText, styles.util.grow1]}>You have no data tables</StyledText>
                                 }/>
            </View>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         onPress={() => {
                             dispatch(addTable())
                         }}/>
        </View>
    )
}
