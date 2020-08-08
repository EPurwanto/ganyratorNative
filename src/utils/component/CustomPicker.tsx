import React, {FunctionComponent, useContext} from "react";
import {StyleProp, TextStyle, View, ViewProps} from "react-native";
import {Picker} from "@react-native-community/picker";
import AppStyles from "../../styles/AppStyles";

export interface PickerItem {
    label: string;
    value: string;
    key: string;
}

interface IProps extends ViewProps {
    items: PickerItem[];
    pickerStyle?: StyleProp<TextStyle>;
    itemStyle?: StyleProp<TextStyle>;
    prompt: string;
    selectedValue?: string;
    onValueChange?: (value: string) => void;
}

export const CustomPicker : FunctionComponent<IProps> = ({items, pickerStyle, itemStyle, prompt, selectedValue, onValueChange, ...others}: IProps) => {
    const styles = useContext(AppStyles);

    let useItems = items;
    if (useItems.length == 0)
        useItems = [{label: "Nothing", value: "", key: ""}] as PickerItem[];

    if (!selectedValue && onValueChange && useItems.length > 0) {
        onValueChange(useItems[0].value);
    }

    return (
        <View {...others}>
            <Picker style={[styles.util.picker, pickerStyle]}
                    itemStyle={[styles.util.pickerItem, itemStyle]}
                    prompt={prompt}
                    selectedValue={selectedValue}
                    onValueChange={(val) => onValueChange && onValueChange(val as string)}>

                {
                    useItems.map((i) => <Picker.Item value={i.value} label={i.label} key={i.key}/>)
                }
            </Picker>
        </View>
    )
};

export default CustomPicker;
