import React, {Dispatch, SetStateAction} from 'react'
import {ISession} from "./SessionStorage";
import {IAppStyles} from "../styles/AppStyles";
import {Table} from "./TableUtils";

export interface IContext extends ISession {
    // actions: Action[],
    // updateActions: (add?: Action, remove?: Action) => void;
    updateTables: (update?: Table | Table[], add?: Table | Table[], remove?: Table | Table[]) => void;

    setText: Dispatch<SetStateAction<string>>;
}

const AppContext = React.createContext<IContext>({
    id: "",
    setText: ()=>{},
    tables: [],
    text: "",
    updateTables: () => {},
});

export default AppContext;
