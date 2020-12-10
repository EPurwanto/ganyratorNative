import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import StyledText from "../utils/component/StyledText";
import TableChainActionHelpScreens from "./TableChainActionHelpScreens";

export interface IProps {

}

export const TableChainActionHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                A chain action is one or more tables that will be rolled on when the row is selected as the result of a
                roll on it's table. Chain actions allow you to link tables together to create complex outcomes.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can use chain actions to decide specific details about the result, such as deciding what limb is
                damaged in an injury roll. You can also use them for values that only apply to some outcomes, such as
                what clan a dwarf belongs to, or how mighty their beard is.
            </StyledText>
        </View>
    )
}

export const TableChainActionHelpScreen2: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                There are two ways to assign a chain action.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                First, you can select an existing action you have created using the action editor. This is useful for if
                you will be using the same action in multiple places.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Second, you can create an action specific to this row. You assign tables that will be rolled, and the
                names the results will be saved under.
            </StyledText>
        </View>
    )
}

export const TableChainActionHelpScreen3: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Selecting an existing action is best if you plan to use it in more than one place. It will save you time
                both setting up the actions, and making changes to them. Creating a new action is good for when you know
                you'll only use it once, as it won't show up in the roll dropdown or action list.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Note that if the same field name shows up in a single roll multiple times, only the last result will be
                used.
            </StyledText>
        </View>
    )
}

export default [<TableChainActionHelpScreen1/>, <TableChainActionHelpScreen2/>, <TableChainActionHelpScreen3/>]
