import React, {FunctionComponent, useContext} from "react";
import {TouchButton} from "./TouchButton";
import {Modal, StyleProp, Text, View, ViewStyle} from "react-native";
import AppStyles from "../../styles/AppStyles";

export interface IProps {
    visible: boolean,
    close: () => void;
    style?: StyleProp<ViewStyle>
}
export const Overlay : FunctionComponent<IProps> = ({visible, close, style, children, ...others}) => {
    const styles = useContext(AppStyles);

    if (!visible) {
        return <View/>
    }

    return (
        <View style={[styles.menu.modal]}>
            <TouchButton style={styles.menu.backdrop} onPress={() => close()}/>
            <View style={style}>
                {children}
            </View>
        </View>
    )
}
