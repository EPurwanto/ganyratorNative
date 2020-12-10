import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import StyledText from "../utils/component/StyledText";

export interface IProps {

}

export const ActionHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Actions are a convenient way to group multiple tables together. They allow you to roll on multiple tables
                at once, or the same table multiple times, and collect the results together.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can use actions to create entire NPC's with the press of a button, or generate loot to fill a chest.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can add a new action by clicking the blue 'Add' button at the bottom, or edit an existing action by
                tapping on it in the list.
            </StyledText>
        </View>
    )
}


export default [<ActionHelpScreen1/>]
