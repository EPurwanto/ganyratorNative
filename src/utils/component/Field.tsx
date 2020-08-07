import React, {FunctionComponent, useContext} from "react";
import {Text, View} from "react-native";
import AppContext from "../AppContext";
import AppStyles from "../../styles/AppStyles";
import StyledText from "./StyledText";

interface IProps {
    label: string
}

export const Field : FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);
    return (
        <View style={styles.field.base}>
            <StyledText style={[styles.field.label]}>{props.label}</StyledText>
            {props.children}
        </View>
    )
};
