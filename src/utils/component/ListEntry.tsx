import {Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler"
import React, {useContext} from "react";
import AppStyles from "../../styles/AppStyles";
import {colours} from "../../styles/UtilStyles";
import StyledText from "./StyledText";

interface IProps {
    title: string;
    subTitle?: string;
    onPress?: (title: string) => void;
}

export default function (props: IProps) {
    const styles = useContext(AppStyles);

    return (
        <RectButton underlayColor={colours.highlightUnderlay}
                    onPress={() => props.onPress && props.onPress(props.title)}>
            <View style={styles.list.item}>
                <View style={styles.list.itemTextContainer}>
                    <StyledText style={[styles.list.itemTitle]}>{props.title}</StyledText>
                    <StyledText style={[styles.list.itemSubtitle]}>{props.subTitle}</StyledText>
                </View>
            </View>
        </RectButton>
    )
}
