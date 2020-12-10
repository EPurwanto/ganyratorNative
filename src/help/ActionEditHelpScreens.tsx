import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../styles/AppStyles";
import {View} from "react-native";
import StyledText from "../utils/component/StyledText";

export interface IProps {

}

export const ActionEditHelpScreen1: FunctionComponent<IProps> = (props) => {
    const styles = useContext(AppStyles);

    return (
        <View>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                The action name and description are just there for your convenience. Good names will help you find the
                right action quickly, and good descriptions will help you keep track of what an action contains.
            </StyledText>
            <StyledText style={[styles.util.txtCenter, styles.util.para]}>
                An action may also contain as many rows as you would like. Each row represents a table that will be rolled
                on as a part of this action. The results will be collected into a final bundle with values saved under
                the field name.
            </StyledText>
        </View>
    )
}


export default [<ActionEditHelpScreen1/>]
