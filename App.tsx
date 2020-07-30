import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import SessionStorage, {ISession} from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {Action} from "./src/utils/ActionUtils";
import {Table} from "./src/utils/TableUtils";
// import {Picker} from "@react-native-community/picker";

export default function App() {
    const [text, setText] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        SessionStorage.Load()
            .then((loadSesh) => {    // Load delaying debug stuff
                return new Promise<ISession>(resolve => {
                    setTimeout(() => resolve(loadSesh), 1000)
                })
            })
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
                text: text,
                loaded: loaded
            }).then(() => {
                console.log("Saved: " + text);
            }).catch((e) => {
                console.log("Save Error: " + e);
            });
        }
    });

    if (loaded) {
        return (
            <AppContext.Provider value={
                {
                    actions: [],
                    updateActions: (add?: Action, remove?: Action) => {},

                    contentTables: [],
                    updateTables: (add?: Table, remove?: Table) => {}
                }
            }>
                <View style={styles.container}>
                    <Text>Session: {text}</Text>
                    <Text>Loaded: {loaded ? "true": "false"}</Text>
                    <Button title={"Hello"} onPress={() => {setText("Hello")}}/>
                    <Button title={"Goodbye"} onPress={() => {setText("Goodbye")}}/>
                    <Button title={"G'Day"} onPress={() => {setText("G'Day")}}/>
                    <StatusBar style="auto" />
                </View>
            </AppContext.Provider>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Loading Session</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
