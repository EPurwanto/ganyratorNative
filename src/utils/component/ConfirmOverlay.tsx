import React, {FunctionComponent, useContext, useState} from "react";
import {StyleProp, View, ViewStyle} from "react-native";
import {Overlay} from "./Overlay";
import StyledText from "./StyledText";
import AppStyles from "../../styles/AppStyles";
import {TouchButton} from "./TouchButton";
import AppContext from "../AppContext";


export interface IProps {
    message?: string,
    confirmMessage?: string,
    cancelMessage?: string,
    action?: () => void,
}

export const ConfirmOverlay : FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);
    const context = useContext(AppContext);

    const close = () => {
        context.showOverlay(undefined);
    }

    return (
        <Overlay visible={true}
                 close={close}
                 style={[styles.util.centerContent, styles.util.grow1]}>
            <View style={[styles.menu.overlay, styles.menu.confirmOverlay]}>
                <View style={[styles.util.row, styles.menu.menuItem]}>
                    {
                        props.children ??
                        <StyledText>{props.message ?? "No Message was supplied to the overlay"}</StyledText>
                    }
                </View>
                <View style={[styles.util.row, styles.menu.menuItem]}>
                    <TouchButton label={"Confirm"}
                                 style={styles.util.btnPrimary}
                                 labelStyle={styles.util.txtPrimary}
                                 onPress={() => {
                                     props.action && props.action();
                                     close();
                                 }}/>
                    <View style={styles.util.grow1}/>
                    <TouchButton label={"Cancel"}
                                 style={styles.util.btnDanger}
                                 labelStyle={styles.util.txtDanger}
                                 onPress={close}/>
                </View>
            </View>
        </Overlay>
    )
}
