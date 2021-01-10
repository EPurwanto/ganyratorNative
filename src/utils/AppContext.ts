import React from 'react'
import {ISession} from "./SessionStorage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";
import {RouteProp} from "@react-navigation/native";

export interface IContext {
    showOverlay: (node: JSX.Element | undefined) => void;
    currentRoute?: RouteProp<any, any>;
    saveSession: () => void;
}

const AppContext = React.createContext<IContext>({
    showOverlay: () => {},
    currentRoute: undefined,
    saveSession: () => {},
});

export default AppContext;
