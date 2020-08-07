import React, {useContext} from "react";
import {View} from "react-native";
import AppStyles from "../styles/AppStyles";
import {StackNavigationProp} from "@react-navigation/stack";
import {TablesParamList} from "../tables/TableContextScreen";
import AppContext from "../utils/AppContext";
import {useNavigation} from "@react-navigation/native";
import {FlatList} from "react-native-gesture-handler";
import ListEntry from "../utils/component/ListEntry";
import {Action} from "../utils/ActionUtils";
import {ActionParamsList} from "./ActionContextScreen";

type ActionListNavigationProp = StackNavigationProp<ActionParamsList, "List">;

export default function () {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);
    const navigation = useNavigation<ActionListNavigationProp>();

    return (
        <View style={styles.util.container}>
            <FlatList<Action> data={context.actions}
                             renderItem={({item}) =>
                                 <ListEntry title={item.name}
                                            subTitle={item.desc}
                                            key={item.key}
                                            onPress={() => navigation.navigate("Edit", {action: item})}
                                 />
                             }
            />
        </View>
    )
}
