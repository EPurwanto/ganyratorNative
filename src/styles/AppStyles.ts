import React from "react";
import {FieldStyles, IFieldStyles} from "./FieldStyles";
import {IUtilStyles, UtilStyles} from "./UtilStyles";
import {IListStyles, ListStyles} from "./ListStyles";
import {IRollScreenStyles, RollScreenStyles} from "./RollScreenStyles";
import LightTheme, {Theme} from "./AppTheme";

export interface IAppStyles {
    util: IUtilStyles,
    field: IFieldStyles,
    list: IListStyles,
    roll: IRollScreenStyles,
    underlayColour: string,
}

export function GetStyles(theme: Theme) {
    return {
        util: UtilStyles(theme),
        field: FieldStyles(theme),
        list: ListStyles(theme),
        roll: RollScreenStyles(theme),
        underlayColour: theme.colors.highlightUnderlay,
    }
}

export const DefaultStyles = GetStyles(LightTheme);

const AppStyles = React.createContext<IAppStyles>(DefaultStyles);

export default AppStyles;
