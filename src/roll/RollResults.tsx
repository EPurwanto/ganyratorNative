import React, {useContext} from "react";
import {View} from "react-native";
import AppStyles from "../styles/AppStyles";
import StyledText from "../utils/component/StyledText";

interface IProps {
    label: string;
    values: Map<string, string>;
}

export default function(props: IProps) {
    const styles = useContext(AppStyles);

    return (
        <View style={styles.roll.resultEntry}>
            <StyledText style={[styles.roll.resultTitle]}>{props.label}</StyledText>
            {
                Array.from(props.values).map(([key, value]) =>
                    <View style={styles.util.row} key={key}>
                        <StyledText style={[styles.roll.resultLabel]}>{key}:</StyledText>
                        <StyledText style={[styles.roll.resultValue]}>{value}</StyledText>
                    </View>
                )
            }
        </View>
    )
}
