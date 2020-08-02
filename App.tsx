import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./src/home/HomeScreen";
import AppStyles from "./src/utils/AppStyles";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {backgroundColor} from "react-native-tab-view/lib/typescript/example/src/CoverflowExample";
import TableScreen from "./src/tables/TableScreen";
import ActionScreen from "./src/actions/ActionScreen";

export default function App() {
    const [text, setText] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        SessionStorage.Load()
            // .then((loadSesh) => {    // Load delaying debug stuff
            //     return new Promise<ISession>(resolve => {
            //         setTimeout(() => resolve(loadSesh), 1000)
            //     })
            // })
            .then(loadSesh => {
                console.log("Loaded: " + loadSesh.text);
                setText(loadSesh.text);
                setLoaded(true);
            })
            .catch((e)=> {
                console.log(e);
                setText("Load Error: " + e);
                setLoaded(true);
            });
    }, []);

    useEffect(() => {
        if (loaded) {
            SessionStorage.Save({
                text: text
            }).then(() => {
                console.log("Saved: " + text);
            }).catch((e) => {
                console.log("Save Error: " + e);
            });
        }
    });

    if (!loaded) {
        return (
            <View style={AppStyles.container}>
                <Text>Loading Session</Text>
            </View>
        )
    }

    const Tab = createMaterialTopTabNavigator();

    return (
        <AppContext.Provider value={
            {
                text: text,
                setText: setText,
                styles: AppStyles,
            }
        }>
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
        </AppContext.Provider>
    );
}
