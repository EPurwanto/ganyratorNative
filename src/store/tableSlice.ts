import {Action as ReduxAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTable, createTableContent, Table, TableContent} from "../utils/TableUtils";
import {find, findIndex, replace} from "../utils/Utils";
import {ActionContent, createActionContent} from "../utils/ActionUtils";
import {ChainActionIdentifier, TableContentIdentifier, TableIdentifier} from "./store";

export interface TableState {
    items: Table[],
    createdTable?: Table,
}

const initialState: TableState = {
    items: []
}

const slice = createSlice({
    name: "table",
    initialState,
    reducers: {
        loadTables(state: TableState, reduxAction: PayloadAction<Table[]>) {
            state.items = reduxAction.payload;
        },
        addTable(state: TableState, reduxAction: ReduxAction) {
            const created = createTable(state.items)
            state.items.push(created);
            state.createdTable = created;
        },
        cloneTable(state: TableState, reduxAction: PayloadAction<TableIdentifier>) {
            const tableId = reduxAction.payload.tableId;
            const tables = state.items;
            const base = find(tables, tableId);

            if (!base) {
                throw `Table with id [${tableId}] not found to clone`;
            }

            const created = createTable(tables, "Copy of " + base.name, base.desc, base.contents);
            state.items.push(created);
            state.createdTable = created;
        },
        updateTable(state: TableState, reduxAction: PayloadAction<Table>) {
            replace(state.items, reduxAction.payload, true);
        },
        deleteTable(state: TableState, reduxAction: PayloadAction<TableIdentifier>) {
            const tableId = reduxAction.payload.tableId;
            const tables = state.items;

            const table = find(tables, tableId);
            if (!table) {
                throw `Table with id [${tableId}] not found to delete`;
            }

            const index = findIndex(tables, table);
            if (index >= 0) {
                tables.splice(index, 1);
            }
        },
        addRow(state: TableState, reduxAction: PayloadAction<TableIdentifier>) {
            const tableId = reduxAction.payload.tableId;
            const tables = state.items;

            const table = find(tables, tableId);
            if (!table){
                throw `Table with id [${tableId}] not found to add row`;
            }

            table.contents.push(createTableContent(table));
        },
        updateRow(state: TableState, reduxAction: PayloadAction<TableContent>) {
            const contents = reduxAction.payload;

            const table = find(state.items, contents.parent);
            if (!table) {
                throw `Table with id [${contents.parent}] not found to update row`;
            }

            replace(table.contents, contents, true)
        },
        deleteRow(state: TableState, reduxAction: PayloadAction<TableContentIdentifier>) {

        },
        addChainAction(state: TableState, reduxAction: PayloadAction<TableContentIdentifier>) {
            const tableId = reduxAction.payload.tableId;
            const contentId = reduxAction.payload.tableContentId;
            const tables = state.items;

            const table = find(tables, tableId);
            if (!table){
                throw `Table with id [${tableId}] not found to add chain action`;
            }

            const content = find(table.contents, contentId);
            if (!content) {
                throw `Content with id [${contentId}] not found on table [${tableId}] to add chain action`;
            }

            if (!content.action) {
                content.action = [];
            }

            let action = content.action;

            if (Array.isArray(action)) {
                action.push(createActionContent(action))
            } else {
                throw `Cannot add chain action to row with selected action`
            }
        },
        updateChainAction(state: TableState, reduxAction: PayloadAction<{parent: TableContentIdentifier, row: ActionContent}>) {
            const tableId = reduxAction.payload.parent.tableId;
            const contentId = reduxAction.payload.parent.tableContentId;
            const actionContent = reduxAction.payload.row;
            const tables = state.items;

            const table = find(tables, tableId);
            if (!table) {
                throw `Table with id [${tableId}] not found to add chain action`;
            }

            const content = find(table.contents, contentId);
            if (!content) {
                throw `TableContent with id [${contentId}] not found in table [${tableId}] to add chain action`;
            }

            const action = content.action;
            if (Array.isArray(action)) {
                replace(action, actionContent, true)
            } else {
                throw `Cannot update chain action on row with selected action`
            }
        },
        deleteChainAction(state: TableState, reduxAction: PayloadAction<ChainActionIdentifier>) {

        },
        clearCreatedTable(state: TableState) {
            state.createdTable = undefined;
        },
    },
})

export const {loadTables, addTable, cloneTable, updateTable, deleteTable, addRow, updateRow, deleteRow, addChainAction, updateChainAction, deleteChainAction, clearCreatedTable} = slice.actions

export default slice.reducer;
