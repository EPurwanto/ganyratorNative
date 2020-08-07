import React, {FunctionComponent, useContext} from "react";
import AppStyles from "../../styles/AppStyles";
import {Text, TextProps} from "react-native";

interface IProps extends TextProps{

}

const StyledText : FunctionComponent<IProps> = ({style, children, ...others}) => {
    const styles = useContext(AppStyles);
    return (
        <Text style={[styles.util.txt, style]} {...others}>
            {children}
        </Text>
    )
};

export default StyledText;
