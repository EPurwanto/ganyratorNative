import React, {FunctionComponent, useContext} from "react";
import {TextStyle, TouchableHighlight, TouchableWithoutFeedbackProps, View} from "react-native";
import AppStyles from "../../styles/AppStyles";
import StyledText from "./StyledText";

interface IProps extends TouchableWithoutFeedbackProps {
    label?: string;
    labelStyle?: TextStyle | TextStyle[];
}

export const TouchButton : FunctionComponent<IProps> = ({children, style, label, labelStyle, disabled, ...others}) => {
    const styles = useContext(AppStyles);

    const buttonStyle = [styles.util.btn, style];

    if (disabled) {
        buttonStyle.push(styles.util.btn_disabled)
    }

    return (
        <TouchableHighlight underlayColor={styles.underlayColour}
                            style={buttonStyle}
                            disabled={disabled}
                            {...others}>
            <View>
                {
                    children ? children : <StyledText style={[labelStyle]}>{label}</StyledText>
                }
            </View>
        </TouchableHighlight>
    )
};
