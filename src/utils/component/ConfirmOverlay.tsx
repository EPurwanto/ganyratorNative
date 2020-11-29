import React, {FunctionComponent, useContext} from "react";
import {View} from "react-native";
import {Overlay, IProps as OverlayProps} from "./Overlay";
import StyledText from "./StyledText";
import AppStyles from "../../styles/AppStyles";
import {TouchButton} from "./TouchButton";


export interface IProps {
    message?: string,
    confirmMessage?: string,
    cancelMessage?: string,
    action?: () => void,
}

export const ConfirmOverlay : FunctionComponent<IProps & OverlayProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <Overlay visible={props.visible} setVisible={props.setVisible} style={[styles.util.centerContent, styles.util.grow1]}>
            <View style={[styles.menu.overlay, styles.menu.confirmOverlay, props.style]}>
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
                                     props.setVisible(false);
                                 }}/>
                    <View style={styles.util.grow1}/>
                    <TouchButton label={"Cancel"}
                                 style={styles.util.btnDanger}
                                 labelStyle={styles.util.txtDanger}
                                 onPress={() => props.setVisible(false)}/>
                </View>
            </View>
        </Overlay>
    )
}
