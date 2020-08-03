import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import React from "react";
import {FieldStyles, IFieldStyles} from "./FieldStyles";
import {fontSize, IUtilStyles, UtilStyles} from "./UtilStyles";
import {IListStyles, ListStyles} from "./ListStyles";

export interface IAppStyles {
    util: IUtilStyles,
    field: IFieldStyles,
    list: IListStyles,
}

const AppStyles = React.createContext<IAppStyles>({
    util: UtilStyles,
    field: FieldStyles,
    list: ListStyles,
});

export default AppStyles;