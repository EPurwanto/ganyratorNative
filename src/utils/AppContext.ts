import React, {Dispatch, SetStateAction} from 'react'
import {ISession} from "./SessionStorage";
import {IAppStyles} from "./AppStyles";
import {Table} from "./TableUtils";

export interface IContext extends ISession {
    // actions: Action[],
    // updateActions: (add?: Action, remove?: Action) => void;
    tables: Table[],
    updateTables: (add?: Table, remove?: Table) => void;

    setText: Dispatch<SetStateAction<string>>;
    styles: IAppStyles;
}

const AppContext = React.createContext({
    // actions: [],
    // updateActions: (add?: Action, remove?: Action) => {},
    //
    // contentTables: [],
    // updateTables: (add?: Table, remove?: Table) => {}
} as IContext);

export default AppContext;
