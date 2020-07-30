import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SessionStorage from "./src/utils/SessionStorage";
import AppContext from "./src/utils/AppContext";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./src/home/HomeScreen";
import AppStyles from "./src/utils/AppStyles";

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

    const Stack = createStackNavigator();

    return (
        <AppContext.Provider value={
            {
                text: text,
                setText: setText,
                styles: AppStyles,
            }
        }>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"Home"} component={HomeScreen} options={{ title: 'gANYrator' }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}
