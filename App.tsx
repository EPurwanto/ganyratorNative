import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./src/home/HomeScreen";
import AppStyles, {DefaultStyles} from "./src/styles/AppStyles";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import TableScreen from "./src/tables/TableContextScreen";
import ActionScreen from "./src/actions/ActionScreen";
// @ts-ignore
import {nanoid} from "nanoid/async/index.native.js";
import {createTable, createTableContent, Table} from "./src/utils/TableUtils";
import {handleUpdate} from "./src/utils/Utils";
import {UtilStyles} from "./src/styles/UtilStyles";

export default function App() {
    const [id, setId] = useState("");
    const [tables, setTables] = useState([] as Table[]);
    const [loaded, setLoaded] = useState(false);

    // Load Session from storage
    useEffect(() => {
        SessionStorage.Load()
            // .then((loadSesh) => {    // Load delaying debug stuff
            //     return new Promise<ISession>(resolve => {
            //         setTimeout(() => resolve(loadSesh), 1000)
            //     })
            // })
            .then(loadSesh => {
                setTables(loadSesh.tables);
                setLoaded(true);
            })
            .catch((e)=> {
                console.log(e);
                Promise.all(
                    [sampleTables()
                            .then(ts => setTables(ts)),
                        nanoid()
                            .then((id: string) => setId(id))
                    ]
                ).then(() => setLoaded(true))
            });
    }, [id]);

    // Save Session every change
    useEffect(() => {
        if (loaded) {
            SessionStorage.Save({
                id: id,
                tables: tables,
            }).catch((e) => {
                console.log("Save Error: " + e);
            });
        }
    });

    if (!loaded) {
        return (
            <View style={UtilStyles.container}>
                <Text>Loading Session</Text>
            </View>
        )
    }

    const Tab = createMaterialTopTabNavigator();

    return (
        <AppContext.Provider value={{
            tables: tables,
            updateTables: ((update, add, remove) => setTables(handleUpdate(tables, update, add, remove))),
            id: id,
        }}>
            <AppStyles.Provider value={DefaultStyles}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <StatusBar style="auto" />
                        <Tab.Navigator initialRouteName={"Home"}
                                       style={{backgroundColor: "#000000"}}
                                       swipeEnabled={true}
                                       tabBarPosition={"bottom"}
                                       backBehavior={"initialRoute"}>
                            <Tab.Screen name={"Tables"} component={TableScreen} options={{ title: 'Tables' }}/>
                            <Tab.Screen name={"Home"} component={HomeScreen} options={{ title: 'Roll' }}/>
                            <Tab.Screen name={"Actions"} component={ActionScreen} options={{ title: 'Actions' }}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </AppStyles.Provider>
        </AppContext.Provider>
    );
}

async function sampleTables(): Promise<Table[]> {
    return [
        await createTable([], "Test 1", "first test table", [
            await createTableContent([], "Hello", 10),
            await createTableContent([], "Hi", 5),
            await createTableContent([], "Howdy", 2),
            await createTableContent([], "G'day"),
        ]),
        await createTable([], "Test 2", "second test table", [
            await createTableContent([], "Hello"),
            await createTableContent([], "Hi"),
            await createTableContent([], "Howdy"),
            await createTableContent([], "G'day"),
        ]),
        await createTable([], "Test 3", "third test table", [
            await createTableContent([], "Hello"),
            await createTableContent([], "Hi"),
            await createTableContent([], "Howdy"),
            await createTableContent([], "G'day"),
        ]),
        await createTable([], "Test 4", "fourth test table", [
            await createTableContent([], "Hello"),
            await createTableContent([], "Hi"),
            await createTableContent([], "Howdy"),
            await createTableContent([], "G'day"),
        ]),
    ]
}
