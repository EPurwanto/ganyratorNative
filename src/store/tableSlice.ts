import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTable, createTableContent, Table, TableContent} from "../utils/TableUtils";
import {find, findIndex, replace} from "../utils/Utils";
import {ActionContent, createActionContent} from "../utils/ActionUtils";
import {ThunkAPI} from "./store";

export interface TableState {
    items: Table[],
    createdTable?: Table,
}

export interface TableIdentifier {
    tableId: string,
}

export interface TableContentIdentifier extends TableIdentifier{
    tableContentId: string,
}

export interface ChainActionIdentifier extends TableContentIdentifier{
    actionId: string,
}

export const addTable = createAsyncThunk<Table, undefined, ThunkAPI>(
    "tables/addTable",
    (arg, thunkAPI) => {
        const tables = thunkAPI.getState().tables.items;
        return createTable(tables)
    }
)

export const cloneTable = createAsyncThunk<Table, TableIdentifier, ThunkAPI>(
    "tables/copyTable",
    (arg, thunkAPI) => {
        const tables = thunkAPI.getState().tables.items;
        const base = find(tables, arg.tableId);

        if (!base)
            return Promise.reject(`Table with id ${arg.tableId} not found`)

        return createTable(tables, "Copy of " + base.name, base.desc, base.contents);
    }
)

export const addRow = createAsyncThunk<TableContent, TableIdentifier, ThunkAPI>(
    "tables/addRow",
    (arg, thunkAPI) => {
        const allTables = thunkAPI.getState().tables.items;
        const table = find(allTables, arg.tableId);
        if (!table)
            return Promise.reject(`Table with id ${arg.tableId} not found`)
        return createTableContent(table)
    }
)

export const addChainAction = createAsyncThunk<{parent: TableContentIdentifier, actionContent: ActionContent}, TableContentIdentifier, ThunkAPI>(
    "tables/addChainAction",
    (arg, thunkAPI) => {
        const allTables = thunkAPI.getState().tables.items;
        const table = find(allTables, arg.tableId);
        if (!table)
            return Promise.reject(`Table with id ${arg.tableId} not found`)

        const content = find(table.contents, arg.tableContentId);
        if (!content)
            return Promise.reject(`TableContent with id ${arg.tableContentId} not found`)

        const action = content.action;

        if (Array.isArray(action))
            return createActionContent(action)
                .then(actionContent => (
                    {
                        parent: arg,
                        actionContent,
                    }
                ))
        if (!action)
            return createActionContent([])
                .then(actionContent => (
                    {
                        parent: arg,
                        actionContent,
                    }
                ))
        return Promise.reject(`TableContent has a non-array action`)
    }
)

const initialState: TableState = {
    items: []
}

const slice = createSlice({
    name: "table",
    initialState,
    reducers: {
        loadTables(state: TableState, action: PayloadAction<Table[]>) {
            state.items = action.payload;
        },
        updateTable(state: TableState, action: PayloadAction<Table>) {
            replace(state.items, action.payload, true);
        },
        deleteTable(state: TableState, action: PayloadAction<TableIdentifier>) {
            const table = find(state.items, action.payload.tableId);
            if (table) {
                const index = findIndex(state.items, table);
                if (index >= 0) {
                    state.items.splice(index, 1);
                }
            } else {
                console.log("Error: could not find table with id " + action.payload.tableId)
            }
        },
        updateRow(state: TableState, action: PayloadAction<TableContent>) {
            const contents = action.payload;
            const table = find(state.items, contents.parent);
            if (table) {
                replace(table.contents, contents, true)
            } else {
                console.log("Error: could not find parent table with id " + contents.parent)
            }
        },
        deleteRow(state: TableState, action: PayloadAction<TableContentIdentifier>) {

        },
        updateChainAction(state: TableState, action: PayloadAction<{parent: TableContentIdentifier, actionContent: ActionContent}>) {
            const {parent, actionContent} = action.payload;
            const table = find(state.items, parent.tableId);
            const contents = find(table?.contents ?? [], parent.tableContentId);
            if (contents && Array.isArray(contents.action)) {
                replace(contents.action, actionContent, true)
            } else {
                console.log("Error: could not find parent tableContent with id " + parent.tableContentId)
            }
        },
        deleteChainAction(state: TableState, action: PayloadAction<ChainActionIdentifier>) {

        },
        clearCreatedTable(state: TableState) {
            state.createdTable = undefined;
        },
    },
    extraReducers: builder =>  {
        builder
            .addCase(addTable.pending, (state, action) => {
            })
            .addCase(addTable.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.createdTable = action.payload;
            })
            .addCase(addTable.rejected, (state, action) => {
                console.error("Error:", action.error)
            })

            .addCase(cloneTable.pending, (state, action) => {
            })
            .addCase(cloneTable.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.createdTable = action.payload;
            })
            .addCase(cloneTable.rejected, (state, action) => {
                console.error("Error:", action.error)
            })

            .addCase(addRow.pending, (state, action) => {
            })
            .addCase(addRow.fulfilled, (state, action) => {
                const table = find(state.items, action.payload.parent);
                table?.contents.push(action.payload);
            })
            .addCase(addRow.rejected, (state, action) => {
                console.error("Error:", action.error)
            })

            .addCase(addChainAction.pending, (state, action) => {
            })
            .addCase(addChainAction.fulfilled, (state, action) => {
                const {parent, actionContent} = action.payload;
                const table = find(state.items, parent.tableId);
                const content = find(table?.contents ?? [], parent.tableContentId);

                if (!content) {
                    console.error("Error: could not find table or content when creating chain action")
                    return;
                }

                if (!content.action) {
                    content.action = [];
                }
                if (!Array.isArray(content.action)) {
                    console.error("Error:")
                    return;
                }
                content.action.push(actionContent);
            })
            .addCase(addChainAction.rejected, (state, action) => {
                console.error("Error:", action.error)
            })
    }
})

export const {loadTables, updateTable, deleteTable, updateRow, deleteRow, updateChainAction, deleteChainAction, clearCreatedTable} = slice.actions

export default slice.reducer;
