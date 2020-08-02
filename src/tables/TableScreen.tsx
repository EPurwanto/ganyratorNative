import React, {useContext, useState} from "react";
import AppContext from "../utils/AppContext";
import {Text, View} from "react-native";
import {Table} from "../utils/TableUtils";
import ListEntry from "../utils/list/ListEntry";
import {FlatList} from "react-native-gesture-handler";
import {createStackNavigator} from "@react-navigation/stack";

function TableList() {
    const context = useContext(AppContext);
    const [count, setCount] = useState(0);

    return (
        <View style={context.styles.container}>
            <FlatList<Table> data={context.tables}
                             renderItem={({item}) =>
                                 <ListEntry title={item.name}
                                            subTitle={item.desc}
                                            onPress={() => setCount((c) => c+1)}
                                 />
                             }
            />
            <Text>{count}</Text>
        </View>
    )
}

export default function () {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={"List"}>
            <Stack.Screen name={"List"} component={TableList} options={{title: "Edit Tables"}}/>
        </Stack.Navigator>
    )
}
