import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import StyledText from "../utils/component/StyledText";

export interface IProps {

}

export const TableEditHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                The table name and description are just there for your convenience. Good names will help you find the
                right table quickly, and good descriptions will help you keep track of what a table contains.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                A table may also contain as many rows as you would like. Each row represents a single possible outcome
                that can occur when this table is rolled on.
            </StyledText>
        </View>
    )
}
export const TableEditHelpScreen2: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                A row has 3 parts:
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Weight: This number decides how likely a row is to be the result of a roll on this table, relative to the
                other rows.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Element: This is the value returned when this row is rolled.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                Action: Any chain actions that will occur when this row is rolled. Press the button to open the chain
                action editor.
            </StyledText>
        </View>
    )
}

export default [<TableEditHelpScreen1/>, <TableEditHelpScreen2/>]
