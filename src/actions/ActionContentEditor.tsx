import React, {useContext} from "react";
import {TextInput, View} from "react-native";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";
import {find} from "../utils/Utils";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface IProps {
    field?: string,
    table?: string,
    onChange: (field: string | undefined, table: string | undefined) => void;
}

export default function(props: IProps) {
    const styles = useContext(AppStyles);
    const tables = useSelector((state: RootState) => state.tables.items);

    return (
        <View style={[styles.util.row, styles.field.base]}>
            <TextInput value={props.field}
                       placeholder={props.table && find(tables, props.table)?.name || "Select a field"}
                       style={[styles.util.txt, styles.field.group, styles.field.groupStart, styles.util.wHalf]}
                       onChange={(e) => {
                           props.onChange(e.nativeEvent.text, props.table);
                       }}/>
            <CustomPicker items={elementToPickerItem(tables)}
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
