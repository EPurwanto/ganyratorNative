import React, {useContext} from "react";
import {TextInput, View} from "react-native";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import {find} from "../utils/Utils";

interface IProps {
    field?: string,
    table?: string,
    onChange: (field: string | undefined, table: string | undefined) => void;
}

export default function(props: IProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    return (
        <View style={[styles.util.row, styles.field.base]}>
            <TextInput value={props.field}
                       placeholder={props.table && find(context.tables, props.table)?.name || "Select a field"}
                       style={[styles.util.txt, styles.field.group, styles.field.groupStart, styles.util.wHalf]}
                       onChange={(e) => {
                           props.onChange(e.nativeEvent.text, props.table);
                       }}/>
            <CustomPicker items={elementToPickerItem(context.tables)}
                          style={[styles.util.txt, styles.field.group, styles.field.groupEnd, styles.util.wHalf]}
                          pickerStyle={styles.util.grow1}
                          itemStyle={styles.util.grow1}
                          prompt={"Select a table"}
                          selectedValue={props.table}
                          onValueChange={(value) => {
                              props.onChange(props.field, value);
                          }}/>
        </View>
    )
}
