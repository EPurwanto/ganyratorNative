import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import AppStyles, {getStyles} from "./src/styles/AppStyles";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Lato_400Regular, Lato_700Bold, useFonts} from "@expo-google-fonts/lato";
import {Action} from "./src/utils/ActionUtils";
import StackPanel from "./src/MainPanel";
import AppTheme from "./src/styles/AppTheme";
import MainMenu from "./src/menu/MainMenu";
import {ConfirmOverlay} from "./src/utils/component/ConfirmOverlay";
import {Provider} from "react-redux";
import store from "./src/store/store";
import {loadTables} from "./src/store/tableSlice";
import {loadActions} from "./src/store/actionSlice";


export default function App() {
    const [actions, setActions] = useState([] as Action[]);
    const [loaded, setLoaded] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [overlay, setOverlay] = useState<JSX.Element | undefined>()
    const navContainer = useRef<NavigationContainerRef>(null!)

    const tables = store.getState().tables.items;

    const [fontLoaded] = useFonts({Lato_400Regular, Lato_700Bold})
    const styles = getStyles(AppTheme);

    // Load Session from storage
    useEffect(() => {
        SessionStorage.Load()
            .then(loadSesh => {
                // setTables(loadSesh.tables ?? []);
                store.dispatch(loadTables(loadSesh.tables))
                store.dispatch(loadActions(loadSesh.actions))
                setLoaded(true);
            })
            .catch((e)=> {
                console.log("Load Error:" + e);
                setLoaded(true);
            });
    }, []);

    // Save Session every change
    // useEffect(() => {
    //     if (loaded) {
    //         SessionStorage.Save({
    //             actions: actions,
    //             tables: tables,
    //         }).catch((e) => {
    //             console.log("Save Error: " + e);
    //         });
    //     }
    // }, [id, actions, tables]);

    if (!loaded || !fontLoaded) {
        return (
            <View style={styles.util.container}>
                <Text>Loading Session</Text>
            </View>
        )
    }

    return (
        <Provider store={store}>
            <AppContext.Provider value={{
                actions: actions,
                tables: tables,
                updateActions: ((update, add, remove) => {
                    throw 'DEPRECATED: Updating actions'
                }),
                updateTables: ((update, add, remove) => {
                    throw 'DEPRECATED: Updating tables'
                    // setTables(handleUpdateTables(stateTables, update, add, remove))
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
        </Provider>
    );
}
