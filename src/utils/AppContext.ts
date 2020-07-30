import React from 'react'
import {Action} from "./ActionUtils";
import {Table} from "./TableUtils";

export interface IContext {
    actions: Action[],
    updateActions: (add?: Action, remove?: Action) => void;
    contentTables: Table[],
    updateTables: (add?: Table, remove?: Table) => void;
}

const AppContext = React.createContext({
    actions: [],
    updateActions: (add?: Action, remove?: Action) => {},

    contentTables: [],
    updateTables: (add?: Table, remove?: Table) => {}
} as IContext);

export default AppContext;
