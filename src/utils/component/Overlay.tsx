import React, {FunctionComponent, useContext} from "react";
import {TouchButton} from "./TouchButton";
import {Modal, StyleProp, Text, View, ViewStyle} from "react-native";
import AppStyles from "../../styles/AppStyles";

export interface IProps {
    visible: boolean,
    setVisible: (visible: boolean) => void;
    style?: StyleProp<ViewStyle>
}
export const Overlay : FunctionComponent<IProps> = ({visible, setVisible, style, children, ...others}) => {
    const styles = useContext(AppStyles);

    return (
        <Modal animationType={"fade"}
               transparent={true}
               onRequestClose={() => setVisible(false)}
               visible={visible}
               statusBarTranslucent={true}>
            <TouchButton style={styles.menu.backdrop} onPress={() => setVisible(false)}/>
            <View style={style}>
                {children}
            </View>
        </Modal>
    )
}
