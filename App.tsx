import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {NavigationContainer} from "@react-navigation/native";
import AppStyles, {GetStyles} from "./src/styles/AppStyles";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
// @ts-ignore
import {nanoid} from "nanoid/async/index.native.js";
import {handleUpdateTables, Table} from "./src/utils/TableUtils";
import {handleUpdate} from "./src/utils/Utils";
import {Lato_400Regular, Lato_700Bold, useFonts} from "@expo-google-fonts/lato";
import {Action} from "./src/utils/ActionUtils";
import StackPanel from "./src/MainPanel";
import AppTheme from "./src/styles/AppTheme";
import {ConfirmOverlay, IProps as ConfirmProps} from "./src/utils/component/ConfirmOverlay";


export default function App() {
    const [id, setId] = useState("");
    const [tables, setTables] = useState([] as Table[]);
    const [actions, setActions] = useState([] as Action[]);
    const [loaded, setLoaded] = useState(false);
    const [confirmOverlay, setConfirmOverlay] = useState<ConfirmProps | undefined>(undefined);

    const [fontLoaded] = useFonts({Lato_400Regular, Lato_700Bold})

    // Load Session from storage
    useEffect(() => {
        SessionStorage.Load()
            .then(loadSesh => {
                setId(loadSesh.id);
                setTables(loadSesh.tables ?? []);
                setActions(loadSesh.actions ?? []);
                setLoaded(true);
            })
            .catch((e)=> {
                console.log("Load Error:" + e);
                nanoid()
                    .then((id: string) => {
                        setId(id);
                        setTables([]);
                        setActions([])
                        setLoaded(true);
                    })
            });
    }, []);

    // Save Session every change
    useEffect(() => {
        if (loaded) {
            SessionStorage.Save({
                id: id,
                actions: actions,
                tables: tables,
            }).catch((e) => {
                console.log("Save Error: " + e);
            });
        }
    });

    const styles = GetStyles(AppTheme);

    if (!loaded || !fontLoaded) {
        return (
            <View style={styles.util.container}>
                <Text>Loading Session</Text>
            </View>
        )
    }

    return (
        <AppContext.Provider value={{
            id: id,
            actions: actions,
            tables: tables,
            updateActions: ((update, add, remove) => setActions(handleUpdate(actions, update, add, remove))),
            updateTables: ((update, add, remove) => setTables(handleUpdateTables(tables, update, add, remove))),
            showConfirm: ((props) => {
                setConfirmOverlay(props);
            })
        }}>
            <AppStyles.Provider value={styles}>
                <SafeAreaProvider>
                    <ConfirmOverlay visible={confirmOverlay != undefined}
                                    setVisible={(visible => {!visible && setConfirmOverlay(undefined)})}
                                    {...confirmOverlay}/>
                    <NavigationContainer theme={AppTheme}>
                        <StatusBar style="auto" />
                        <StackPanel/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </AppStyles.Provider>
        </AppContext.Provider>
    );
}
