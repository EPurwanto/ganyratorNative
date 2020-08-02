import {Button, Text, View} from "react-native";
import {RectButton, TouchableHighlight} from "react-native-gesture-handler"
import React, {useContext} from "react";
import AppContext from "../AppContext";
import {highlightUnderlay} from "../AppStyles";

interface IProps {
    title: string;
    subTitle?: string;
    onPress?: (title: string) => void;
    // actions?: {
    //     label: string;
    //     onPress?: () => void;
    // }[];
}

export default function (props: IProps) {
    const context = useContext(AppContext);

    return (
        <RectButton underlayColor={highlightUnderlay}
                    onPress={() => props.onPress && props.onPress(props.title)}>
            <View style={context.styles.listItem}>
                <View style={context.styles.listItemTextContainer}>
                    <Text style={context.styles.listItemTitle}>{props.title}</Text>
                    <Text style={context.styles.listItemSubtitle}>{props.subTitle}</Text>
                </View>
                {/*<View style={context.styles.listItemActionContainer}>*/}
                {/*    {*/}
                {/*        props.actions?.map((a) =>*/}
                {/*            <View key={a.label}*/}
                {/*                  style={context.styles.listItemAction}>*/}
                {/*                <Button title={a.label}*/}
                {/*                        onPress={()=>{}}/>*/}
                {/*            </View>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</View>*/}
            </View>
        </RectButton>
    )
}
