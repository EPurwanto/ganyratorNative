import React from 'react'
import {ISession} from "./SessionStorage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";
import {IProps as ConfirmProps} from "./component/ConfirmOverlay";

export interface IContext extends ISession {
    updateActions: (update?: Action | Action[], add?: Action | Action[], remove?: Action | Action[]) => void;
    updateTables: (update?: Table | Table[], add?: Table | Table[], remove?: Table | Table[]) => void;
    showOverlay: (node: Node | undefined) => void;
    showMenu: (visible: boolean) => void;
}

const AppContext = React.createContext<IContext>({
    id: "",
    actions: [],
    tables: [],
    updateActions: () => {},
    updateTables: () => {},
    showOverlay: () => {},
    showMenu: (visible: boolean) => {},
});

export default AppContext;
