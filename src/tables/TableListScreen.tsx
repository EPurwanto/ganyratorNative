import React, {useContext} from "react";
import AppContext from "../utils/AppContext";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {Table} from "../utils/TableUtils";
import ListEntry from "../utils/component/ListEntry";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {TablesParamList} from "./TableContextScreen";
import AppStyles from "../styles/AppStyles";

type TableListNavigationProp = StackNavigationProp<TablesParamList, "List">;

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
                                            onPress={() => navigation.navigate("Edit", {table: item})}
                                 />
                             }
            />
        </View>
    )
}
