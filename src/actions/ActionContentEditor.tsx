import React, {useContext} from "react";
import {TextInput, View} from "react-native";
import CustomPicker, {elementToPickerItem} from "../utils/component/CustomPicker";
import AppStyles from "../styles/AppStyles";
import AppContext from "../utils/AppContext";

interface IProps {
    key: string,
    field?: string,
    table?: string,
    onChange: (field: string | undefined, table: string | undefined) => void;
}

export default function(props: IProps) {
    const context = useContext(AppContext);
    const styles = useContext(AppStyles);

    return (
        <View key={props.key} style={[styles.util.row, styles.field.base]}>
            <TextInput value={props.field}
                       style={[styles.field.group, styles.util.grow1, styles.field.groupStart]}
                       onChange={(e) => {
                           props.onChange(e.nativeEvent.text, props.table);
                       }}
            />
            <CustomPicker items={elementToPickerItem(context.tables)}
                          style={[styles.field.group, styles.field.groupEnd, styles.util.grow1]}
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
