import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
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
import MainMenu from "./src/menu/MainMenu";
import {ConfirmOverlay} from "./src/utils/component/ConfirmOverlay";


export default function App() {
    const [id, setId] = useState("");
    const [tables, setTables] = useState([] as Table[]);
    const [actions, setActions] = useState([] as Action[]);
    const [loaded, setLoaded] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [overlay, setOverlay] = useState<JSX.Element | undefined>()
    const navContainer = useRef<NavigationContainerRef>(null!)

    const [fontLoaded] = useFonts({Lato_400Regular, Lato_700Bold})
    const styles = getStyles(AppTheme);

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
    }, [id, actions, tables]);

    function doCycleCheck(tables: Table[], actions: Action[], ...toCheck: (Table | Action)[]) {

    }
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
            updateActions: ((update, add, remove) => {
                console.log('Updating actions')
                setActions(handleUpdate(actions, update, add, remove));
            }),
            updateTables: ((update, add, remove) => {
                console.log('Updating tables')
                setTables(handleUpdateTables(tables, update, add, remove))
            }),
            showOverlay: ((node) => {
                console.log('Showing confirm overlay')
                setOverlay(node);
            }),
            showMenu: (visible: boolean) => {
                console.log('Showing main menu')
                setMenuVisible(visible)
            },
            currentRoute: navContainer.current?.getCurrentRoute(),
            saveSession: () => {
                SessionStorage.Export({
                    id: id,
                    actions: actions,
                    tables: tables,
                })
                    .then(response => {
                        if (response.success) {
                            setOverlay(
                                <ConfirmOverlay message={`Session exported to ${response.filename}.`}
                                                cancelMessage="close"/>
                            )
                        } else if (response.message === "PermissionRequired") {
                            setOverlay(
                                <ConfirmOverlay message="Storage Permissions are required to save the exported file. Please go to settings to allow the storage permission."
                                                cancelMessage="close"/>
                            )
                        } else {
                            setOverlay(
                                <ConfirmOverlay message="Something went wrong while trying to save the file."
                                                cancelMessage="close"/>
                            )
                            console.log(response.message)
                        }
                    })
            }
        }}>
            <AppStyles.Provider value={styles}>
                <SafeAreaProvider style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                    <NavigationContainer ref={navContainer} theme={AppTheme}>
                        <StatusBar style="auto" />
                        <StackPanel/>
                    </NavigationContainer>
                </SafeAreaProvider>
                { overlay }
                <MainMenu visible={menuVisible} onClose={() => setMenuVisible(false)}/>
            </AppStyles.Provider>
        </AppContext.Provider>
    );
}
