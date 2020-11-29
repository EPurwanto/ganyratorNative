import React from "react";
import {FieldStyles, IFieldStyles} from "./FieldStyles";
import {IUtilStyles, UtilStyles} from "./UtilStyles";
import {IListStyles, ListStyles} from "./ListStyles";
import {IRollScreenStyles, RollScreenStyles} from "./RollScreenStyles";
import LightTheme, {Theme} from "./AppTheme";
import {IMenuStyles, MenuStyles} from "./MenuStyles";

export interface IAppStyles {
    util: IUtilStyles,
    field: IFieldStyles,
    list: IListStyles,
    roll: IRollScreenStyles,
    menu: IMenuStyles,
    underlayColour: string,
    underlayOpacity: number,
}

export function GetStyles(theme: Theme) {
    return {
        util: UtilStyles(theme),
        field: FieldStyles(theme),
        list: ListStyles(theme),
        roll: RollScreenStyles(theme),
        menu: MenuStyles(theme),
        underlayColour: theme.colors.underlay,
        underlayOpacity: theme.colors.underlayOpacity,
    }
}

export const DefaultStyles = GetStyles(LightTheme);

const AppStyles = React.createContext<IAppStyles>(DefaultStyles);

export default AppStyles;
