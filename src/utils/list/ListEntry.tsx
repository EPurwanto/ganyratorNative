import {Text, View} from "react-native";
import {RectButton} from "react-native-gesture-handler"
import React, {useContext} from "react";
import AppStyles from "../../styles/AppStyles";
import {highlightUnderlay} from "../../styles/UtilStyles";

interface IProps {
    title: string;
    subTitle?: string;
    onPress?: (title: string) => void;
}

export default function (props: IProps) {
    const styles = useContext(AppStyles);


    return (
        <RectButton underlayColor={highlightUnderlay}
                    onPress={() => props.onPress && props.onPress(props.title)}>
            <View style={styles.list.item}>
                <View style={styles.list.itemTextContainer}>
                    <Text style={styles.list.itemTitle}>{props.title}</Text>
                    <Text style={styles.list.itemSubtitle}>{props.subTitle}</Text>
                </View>
            </View>
        </RectButton>
    )
}
