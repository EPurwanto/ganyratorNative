import React, {FunctionComponent, useContext} from "react";
import StyledText from "../utils/component/StyledText";
import {View} from "react-native";
import AppStyles from "../styles/AppStyles";

export interface IProps {

}

export const RollHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                This screen is where you will create content for use in your games.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                If you haven't done so already, swipe left to set up some tables of data. You can then return here to
                'roll' on those tables, selecting a random outcome.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can also swipe right to set up an action, allowing you to roll on multiple tables at once. This way
                you can create loot piles, or npc's with a single button press.
            </StyledText>
        </View>
    )
}

export const RollHelpScreen2: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                To roll on a table or action, select it from the drop down below, and then press the blue dice button.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Rolling on a table will select a random row from that table and return it. If the selected row has a
                chain action, it will perform that action as well, rolling on any required tables and collecting the
                result.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can press the red button to clear all previous results.
            </StyledText>
        </View>
    )
}

export default [<RollHelpScreen1/>, <RollHelpScreen2/>]
