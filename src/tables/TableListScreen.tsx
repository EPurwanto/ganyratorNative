import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {createTable, Table} from "../utils/TableUtils";
import ListEntry from "../utils/component/ListEntry";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import AppStyles from "../styles/AppStyles";
import {MainPanelNavProp, MainPanelParamList} from "../MainPanel";
import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import {TouchButton} from "../utils/component/TouchButton";

type TableListNavigationProp = CompositeNavigationProp<MainPanelNavProp, MaterialTopTabNavigationProp<MainPanelParamList, "Tables">>;

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const navigation = useNavigation<TableListNavigationProp>();

    return (
        <View style={styles.util.container}>
            <FlatList<Table> data={context.tables}
                             renderItem={({item}) =>
                                 <ListEntry title={item.name}
                                            subTitle={item.desc}
                                            key={item.key}
                                            onPress={() => navigation.push("TableEdit", {table: item})}
                                 />
                             }/>
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
