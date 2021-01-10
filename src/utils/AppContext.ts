import React from 'react'
import {ISession} from "./SessionStorage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";
import {RouteProp} from "@react-navigation/native";

export interface IContext extends ISession {
    updateActions: (update?: Action | Action[], add?: Action | Action[], remove?: Action | Action[]) => void;
    updateTables: (update?: Table | Table[], add?: Table | Table[], remove?: Table | Table[]) => void;
    showOverlay: (node: JSX.Element | undefined) => void;
    showMenu: (visible: boolean) => void;
    currentRoute?: RouteProp<any, any>;
    saveSession: () => void;
}

const AppContext = React.createContext<IContext>({
    actions: [],
    tables: [],
    updateActions: () => {},
    updateTables: () => {},
    showOverlay: () => {},
    showMenu: () => {},
    currentRoute: undefined,
    saveSession: () => {},
});

export default AppContext;
