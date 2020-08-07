import React, {FunctionComponent, useContext} from "react";
import {Text, TextStyle, TouchableHighlight, TouchableWithoutFeedbackProps, View} from "react-native";
import {colours} from "../../styles/UtilStyles";
import AppStyles from "../../styles/AppStyles";
import StyledText from "./StyledText";

interface IProps extends TouchableWithoutFeedbackProps {
    label?: string;
    labelStyle?: TextStyle | TextStyle[];
}

export const TouchButton : FunctionComponent<IProps> = ({children, style, label, labelStyle, ...others}) => {
    const styles = useContext(AppStyles);
    return (
        <TouchableHighlight underlayColor={colours.highlightUnderlay}
                            style={[styles.util.btn, style]}
                            {...others}>
            <View>
                {
                    children ? children : <StyledText style={[labelStyle]}>{label}</StyledText>
                }
            </View>
        </TouchableHighlight>
    )
};
