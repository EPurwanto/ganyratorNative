import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import StyledText from "../utils/component/StyledText";

export interface IProps {

}

export const TableHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Tables are the core of gANYrator. They allow you to create content that is specific to your world, rules
                or group.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                A table is a collection of possible options that will be randomly decided between.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can add a new table by clicking the blue 'Add' button at the bottom, or edit an existing table by
                tapping on it in the list.
            </StyledText>
        </View>
    )
}

export const TableHelpScreen2: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Each option can be weighted to change how likely it is to occur. A result with a weight of 3 is three times
                more likely to show up than a result with a weight of 1, but half as likely as a result with a weight
                of 6.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Each option can also have a chain action, allowing you to have 'sub-tables' that only matter on certain
                outcomes, or 'master' tables that decide what table you use.
            </StyledText>
        </View>
    )
}

export const TableHelpScreen3: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You can create a table for character races, and use weights to simulate a population distribution, making
                some races more common among your NPC's.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Or you could create a table for a house rule, and use the weights to simulate some combination of dice
                rolls.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                You could also create a table for loot options that decides the general type of loot (scrolls, magic items,
                potions, gold, etc), and use a chain action to roll on sub-tables to decide the specific items.
            </StyledText>
        </View>
    )
}

export default [<TableHelpScreen1/>, <TableHelpScreen2/>, <TableHelpScreen3/>]
