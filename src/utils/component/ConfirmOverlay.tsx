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
        <Overlay visible={props.visible} setVisible={props.setVisible} style={[styles.menu.overlay, styles.menu.confirmOverlay, props.style]}>
            {
                props.children ??
                <StyledText>{props.message ?? "No Message was supplied to the overlay"}</StyledText>
            }
            <View style={styles.util.row}>
                <TouchButton label={"Confirm"}/>
                <TouchButton label={"Cancel"}/>
            </View>
        </Overlay>
    )
}
