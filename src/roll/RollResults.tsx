import React, {useContext} from "react";
import {AppState, Text, View} from "react-native";
import AppStyles from "../styles/AppStyles";

interface IProps {
    label: string;
    values: Map<string, string>;
}

export default function(props: IProps) {
    const styles = useContext(AppStyles);

    return (
        <View style={styles.roll.resultEntry}>
            <Text style={styles.roll.resultTitle}>{props.label}</Text>
            {
                Array.from(props.values).map(([key, value]) =>
                    <View style={styles.util.row} key={key}>
                        <Text style={styles.roll.resultLabel}>{key}:</Text>
                        <Text style={styles.roll.resultValue}>{value}</Text>
                    </View>
                )
            }
        </View>
    )
}
