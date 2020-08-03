import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import React from "react";
import {FieldStyles, IFieldStyles} from "./FieldStyles";
import {fontSize, IUtilStyles, UtilStyles} from "./UtilStyles";
import {IListStyles, ListStyles} from "./ListStyles";
import {IRollScreenStyles, RollScreenStyles} from "./RollScreenStyles";

export interface IAppStyles {
    util: IUtilStyles,
    field: IFieldStyles,
    list: IListStyles,
    roll: IRollScreenStyles,
}

export const DefaultStyles = {
    util: UtilStyles,
    field: FieldStyles,
    list: ListStyles,
    roll: RollScreenStyles,
};

const AppStyles = React.createContext<IAppStyles>(DefaultStyles);

export default AppStyles;
