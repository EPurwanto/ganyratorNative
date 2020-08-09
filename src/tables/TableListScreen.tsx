import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {createTable, Table} from "../utils/TableUtils";
import ListEntry from "../utils/component/ListEntry";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import AppStyles from "../styles/AppStyles";
import {TabPanelNavProp, TabPanelParamList} from "../MainPanel";
import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import {TouchButton} from "../utils/component/TouchButton";

type TableListNavigationProp = CompositeNavigationProp<TabPanelNavProp, MaterialTopTabNavigationProp<TabPanelParamList, "Tables">>;

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const navigation = useNavigation<TableListNavigationProp>();

    return (
        <View style={styles.util.container}>
            <View style={styles.list.base}>
                <FlatList<Table> data={context.tables}
                                 renderItem={({item}) =>
                                     <ListEntry title={item.name}
                                                subTitle={item.desc}
                                                key={item.key}
                                                onPress={() => navigation.push("TableEdit", {table: item})}
                                     />
                                 }/>
            </View>
            <TouchButton style={[styles.util.btnPrimary]}
                         label={"Add"}
                         labelStyle={styles.util.txtPrimary}
                         onPress={() => {
                             createTable(context.tables).then((table) => {
                                 context.updateTables(undefined, table);
                             });
                         }}/>
        </View>
    )
}
