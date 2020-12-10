import React, {FunctionComponent, useContext, useState} from "react";
import {Overlay} from "../utils/component/Overlay";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import {TouchButton} from "../utils/component/TouchButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AppContext from "../utils/AppContext";
import StyledText from "../utils/component/StyledText";
import RollHelpScreens from "./RollHelpScreens";
import TableHelpScreens from "./TableHelpScreens";
import TableEditHelpScreens from "./TableEditHelpScreens";
import TableChainActionHelpScreens from "./TableChainActionHelpScreens";
import ActionHelpScreens from "./ActionHelpScreens";
import ActionEditHelpScreens from "./ActionEditHelpScreens";

export interface IProps {
}

const helpScreens = {
    Roll: RollHelpScreens,
    Tables: TableHelpScreens,
    TableEdit: TableEditHelpScreens,
    TableChainAction: TableChainActionHelpScreens,
    Actions: ActionHelpScreens,
    ActionEdit: ActionEditHelpScreens,
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

export const HelpOverlay: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);
    const context = useContext(AppContext);
    const [index, setIndex] = useState(0);
    const route = context.currentRoute;



    const close = () => {
        context.showOverlay(undefined);
    }

    let screens = [<StyledText>There is no help entry for this screen</StyledText>];
    if (route?.name && hasOwnProperty(helpScreens, route.name)) {
        screens = helpScreens[route.name] as JSX.Element[];
    }

    return (
        <Overlay visible={true}
                 close={close}
                 style={[styles.util.centerContent, styles.util.grow1]}>
            <View style={[styles.menu.overlay, styles.menu.confirmOverlay]}>
                <View style={[styles.util.row, styles.menu.menuItem]}>
                    {
                        screens[index]
                    }
                </View>
                { screens.length > 1 && // Show only when there are multiple screens
                <View style={[styles.util.row, styles.menu.menuItem, styles.util.centerContent]}>
                    <TouchButton style={[styles.util.btn, styles.util.btnPrimary, styles.util.w55, styles.util.mr15]}
                                 disabled={index === 0}
                                 onPress={() => setIndex(index - 1)}>
                        <MaterialCommunityIcons name="chevron-left" style={[styles.util.txt, styles.util.txtPrimary]} />
                    </TouchButton>
                    <TouchButton style={[styles.util.btn, styles.util.btnPrimary, styles.util.w55]}
                                 disabled={index === screens.length - 1}
                                 onPress={() => setIndex(index + 1)}>
                        <MaterialCommunityIcons name="chevron-right" style={[styles.util.txt, styles.util.txtPrimary]} />
                    </TouchButton>
                </View>
                }
            </View>
        </Overlay>
    )
}
