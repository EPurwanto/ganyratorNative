import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Button, Picker, StyleSheet, Text, View} from 'react-native';
// import {Picker} from "@react-native-community/picker";

export default function App() {
  const [lang, setLang] = useState("Boof");
  return (
      <View style={styles.container}>
        <Picker
            selectedValue={lang}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
                setLang(itemValue as string)
            }>
          <Picker.Item label="None" value="" />
          <Picker.Item label="Boof" value="Boof" />
          <Picker.Item label="Doof" value="Doof" />
        </Picker>
        <Button title={"Hello"} onPress={() => {}}/>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
