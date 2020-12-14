import React, {useContext} from "react";
import {Overlay} from "../utils/component/Overlay";
import {View} from "react-native";
import ListEntry from "../utils/component/ListEntry";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {ConfirmOverlay} from "../utils/component/ConfirmOverlay";
import {HelpOverlay} from "../help/HelpOverlay";

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
        <Overlay visible={props.visible} close={props.onClose} style={[styles.menu.overlay, styles.menu.menu]}>
            {/*<View style={styles.util.flex1}>*/}
            <View style={styles.menu.menuItem}>
                <ListEntry title="Help"
                           onPress={() => {
                               console.log("Help")
                               hideMenu();
                               context.showOverlay(
                                   <HelpOverlay/>
                               )
                           }}/>
            </View>
            <View style={styles.menu.menuItem}>
                <ListEntry title="Clear Session"
                           onPress={() => {
                               console.log("Clear Session")
                               hideMenu();
                               context.showOverlay(
                                   <ConfirmOverlay  message="Are you sure you want to clear the session? This will delete all actions and tables and cannot be undone."
                                                    confirmMessage="Clear"
                                                    action={() => {
                                                        context.updateActions(undefined, undefined, context.actions);
                                                        context.updateTables(undefined, undefined, context.tables);
                                                    }}/>)
                           }}
                />
            </View>
            <View style={styles.menu.menuItem}>
                <ListEntry title="Export Session"
                           onPress={() => {
                               console.log("Export Session")
                               hideMenu();
                               context.saveSession();
                           }}
                />
            </View>
        </Overlay>
    )
}
{

}
