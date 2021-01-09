import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {StyleProp, TextStyle, View, ViewProps} from "react-native";
import {Picker} from "@react-native-community/picker";
import AppStyles from "../../styles/AppStyles";
import {Element, Unique} from "../Utils";

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

    const [value, setValue] = useState(selectedValue);

    let useItems = [{label: "Nothing", value: "", key: ""}, ...items];

    useEffect(() => {
        if (!selectedValue) {
            setValue(useItems[0].value);
        }
    }, [useItems])

    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue])

    function handleValueChange(val : string) {
        onValueChange && onValueChange(val)
    }

    return (
        <View {...others}>
            <Picker style={[styles.util.picker, pickerStyle]}
                    itemStyle={[styles.util.pickerItem, itemStyle]}
                    prompt={prompt}
                    selectedValue={value}
                    onValueChange={(val) => handleValueChange(val as string)}>
                {
                    useItems.map((i) => <Picker.Item value={i.value} label={i.label} key={i.key}/>)
                }
            </Picker>
        </View>
    )
};

export default CustomPicker;


export function elementToPickerItem<T extends Element & Unique>(action: T | T[]): PickerItem[] {
    let list = action;
    if (!Array.isArray(list)) {
        list = [list];
    }

    return list.map(act => ({
        label: act.name,
        value: act.key,
        key: act.key,
    }))
}
