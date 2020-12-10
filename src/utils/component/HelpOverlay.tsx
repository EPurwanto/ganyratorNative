import React, {FunctionComponent, useContext} from "react";
import {IProps as OverlayProps, Overlay} from "./Overlay";
import AppStyles from "../../styles/AppStyles";
import {View} from "react-native";
import {TouchButton} from "./TouchButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface IProps {
    screens: Node[];
}

export const HelpOverlay: FunctionComponent<IProps & OverlayProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <Overlay visible={props.visible} setVisible={props.setVisible} style={[styles.util.centerContent, styles.util.grow1]}>
            <View>
                {props.children}
            </View>
            <View style={styles.util.row}>
                <TouchButton>
                    <MaterialCommunityIcons name="chevron-left" style={[]} />
                </TouchButton>
                <TouchButton>
                    <MaterialCommunityIcons name="chevron-right" style={[]} />
                </TouchButton>
            </View>
        </Overlay>
    )
}
