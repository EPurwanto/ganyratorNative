import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTable, createTableContent, Table, TableContent} from "../utils/TableUtils";
import {find, findIndex, replace} from "../utils/Utils";
import {ActionContent, createActionContent} from "../utils/ActionUtils";

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
        addTable(state: TableState, action: Action) {
            const created = createTable(state.items)
            state.items.push(created);
            state.createdTable = created;
        },
        cloneTable(state: TableState, action: PayloadAction<TableIdentifier>) {
            const tableId = action.payload.tableId;
            const tables = state.items;
            const base = find(tables, tableId);

            if (!base) {
                throw `Table with id [${tableId}] not found to clone`;
            }

            const created = createTable(tables, "Copy of " + base.name, base.desc, base.contents);
            state.items.push(created);
            state.createdTable = created;
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
        addRow(state: TableState, action: PayloadAction<TableIdentifier>) {
            const tableId = action.payload.tableId;
            const tables = state.items;
            const table = find(tables, tableId);

            if (!table){
                throw `Table with id [${tableId}] not found to add row`;
            }

            table.contents.push(createTableContent(table));
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
        addChainAction(state: TableState, action: PayloadAction<TableContentIdentifier>) {
            const tableId = action.payload.tableId;
            const contentId = action.payload.tableContentId;
            const tables = state.items;

            const table = find(tables, tableId);
            if (!table){
                throw `Table with id [${tableId}] not found to add chain action`;
            }

            const content = find(table.contents, contentId);
            if (!content) {
                throw `Content with id [${tableId}] not found on table [${table.key}]`;
            }

            if (!content.action) {
                content.action = [];
            }

            let contentAction = content.action;

            if (Array.isArray(contentAction)) {
                contentAction.push(createActionContent(contentAction))
            } else {
                throw `Cannot add chain action to row with existing action`
            }
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
})

export const {loadTables, addTable, cloneTable, updateTable, deleteTable, addRow, updateRow, deleteRow, addChainAction, updateChainAction, deleteChainAction, clearCreatedTable} = slice.actions

export default slice.reducer;
