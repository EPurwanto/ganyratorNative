import React, {FunctionComponent, useContext} from "react";
import {Text, View} from "react-native";
import AppContext from "./AppContext";
import AppStyles from "../styles/AppStyles";

interface IProps {
    label: string
}

export const Field : FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);
    return (
        <View style={styles.field.base}>
            <Text>{props.label}</Text>
            {props.children}
        </View>
    )
};
