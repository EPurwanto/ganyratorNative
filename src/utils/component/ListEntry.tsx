import {Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler"
import React, {useContext} from "react";
import AppStyles from "../../styles/AppStyles";
import StyledText from "./StyledText";
import {useTheme} from "@react-navigation/native";

interface IProps {
    title: string;
    subTitle?: string;
    onPress?: (title: string) => void;
}

export default function (props: IProps) {
    const styles = useContext(AppStyles);

    return (
        <RectButton underlayColor={styles.underlayColour}
                    onPress={() => {props.onPress && props.onPress(props.title)}}>
            <View style={styles.list.item}>
                <View style={styles.list.itemTextContainer}>
                    <StyledText style={[styles.list.itemTitle]}>{props.title}</StyledText>
                    {
                        props.subTitle ? <StyledText style={[styles.list.itemSubtitle]}>{props.subTitle}</StyledText> : null
                    }
                </View>
            </View>
        </RectButton>
    )
}
