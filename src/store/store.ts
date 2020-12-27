import {configureStore, Middleware} from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger';
import tableSlice, {TableState} from "./tableSlice";
import thunk from "redux-thunk";
import SessionStorage from "../utils/SessionStorage";

export interface Store {
    tables: TableState;
}

export const saveOnChange: Middleware<
    {}, // legacy type parameter added to satisfy interface signature
    Store
    > = store => next => action => {
    const val = next(action);

    SessionStorage.Save({
        id: "",
        actions: [],
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
    },
    middleware: [saveOnChange, thunk, logger]
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;

export interface ThunkAPI {
    dispatch: AppDispatch,
    state: RootState,
    extra: {}
}

export interface Action {
    type: string;
}
