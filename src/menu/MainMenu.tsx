import React, {useContext} from "react";
import {TouchButton} from "../utils/component/TouchButton";
import {Overlay} from "../utils/component/Overlay";
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";
import ListEntry from "../utils/component/ListEntry";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {RectButton} from "react-native-gesture-handler";
import {ConfirmOverlay} from "../utils/component/ConfirmOverlay";

interface IProps {
    visible: boolean,
    onClose: () => void,

}

export default function(props: IProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    function hideMenu() {
        props.onClose();
    }

    return (
        <Overlay visible={props.visible} setVisible={props.onClose} style={[styles.menu.overlay, styles.menu.menu]}>
            {/*<View style={styles.util.flex1}>*/}
            <View style={styles.menu.menuItem}>
                <ListEntry title="Help"/>
            </View>
            <View style={styles.menu.menuItem}>
                <ListEntry title="Clear Session"
                           onPress={() => {
                               console.log("Clear Session")
                               hideMenu();
                               context.showOverlay(
                                   <ConfirmOverlay  message="Are you sure you want to clear the session? This will delete all actions and tables and cannot be undone."
                                                    confirmMessage="Clear"
                                                    cancelMessage="Cancel"
                                                    action={() => {
                                                        context.updateActions(undefined, undefined, context.actions);
                                                        context.updateTables(undefined, undefined, context.tables);
                                                    }}/>)
                           }}
                />
            </View>
        </Overlay>
    )
}
{

}
