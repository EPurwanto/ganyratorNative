import React, {useContext} from "react";
import {TouchButton} from "../utils/component/TouchButton";
import {Overlay} from "../utils/component/Overlay";
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";
import ListEntry from "../utils/component/ListEntry";
import AppContext from "../utils/AppContext";
import AppStyles from "../styles/AppStyles";
import {RectButton} from "react-native-gesture-handler";

interface IProps {
    visible: boolean,
    onClose: () => void,

}

export default function(props: IProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    function hideMenu() {
        props.visible = false;
        props.onClose();
    }

    return (
        <Overlay visible={props.visible} setVisible={props.onClose} style={styles.util.row}>
            <View style={styles.util.flex1}/>
            <View style={[styles.menu.overlay, styles.menu.menu]}>
                <View style={styles.menu.menuItem}>
                    <ListEntry title="Help"/>
                </View>
                <View style={styles.menu.menuItem}>
                    <TouchableWithoutFeedback onPress={() => console.log("Clear Session")}>
                        <ListEntry title="Clear Session"
                                   // onPress={() => {
                                   //     console.log("Clear Session")
                                   //     hideMenu();
                                   //     context.showConfirm({
                                   //         message: "Are you sure you want to clear the session? This will delete all actions and tables " +
                                   //             "and cannot be undone.",
                                   //         confirmMessage: "Clear",
                                   //         cancelMessage: "Cancel",
                                   //         action: () => {
                                   //             context.updateActions(undefined, undefined, context.actions);
                                   //             context.updateTables(undefined, undefined, context.tables);
                                   //         }
                                   //     })
                                   // }}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.menu.menuItem}>
                    <RectButton onPress={() => console.log("Rect")}>
                        <Text>300</Text>
                    </RectButton>
                    <Button title={"thing"} onPress={() => console.log("Rect")}/>
                </View>
            </View>
        </Overlay>
    )
}
