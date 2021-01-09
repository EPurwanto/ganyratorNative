import {configureStore, Middleware} from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger';
import tableSlice, {TableState} from "./tableSlice";
import thunk from "redux-thunk";
import SessionStorage from "../utils/SessionStorage";
import actionSlice, {ActionState} from "./actionSlice";

export interface Store {
    tables: TableState;
    actions: ActionState;
}

export const saveOnChange: Middleware<
    {}, // legacy type parameter added to satisfy interface signature
    Store
    > = store => next => action => {
    const val = next(action);

    SessionStorage.Save({
        actions: store.getState().actions.items,
        tables: store.getState().tables.items,
    }).catch((e) => {
        console.log("Save Error: " + e);
    });

    return val;
}

const logger = createLogger({
    collapsed: true
})

const store =  configureStore({
    reducer: {
        tables: tableSlice,
        actions: actionSlice,
    },
    middleware: [saveOnChange, thunk, logger]
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;

export interface TableIdentifier {
    tableId: string,
}

export interface TableContentIdentifier extends TableIdentifier{
    tableContentId: string,
}

export interface ChainActionIdentifier extends TableContentIdentifier{
    actionId: string,
}

export interface ActionIdentifier {
    actionId: string,
}
