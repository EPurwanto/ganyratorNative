import React from 'react'
import {ISession} from "./SessionStorage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";

export interface IContext extends ISession {
    actions: Action[],
    // updateActions: (add?: Action, remove?: Action) => void;
    updateTables: (update?: Table | Table[], add?: Table | Table[], remove?: Table | Table[]) => void;
}

const AppContext = React.createContext<IContext>({
    id: "",
    actions: [],
    tables: [],
    updateTables: () => {},
});

export default AppContext;
