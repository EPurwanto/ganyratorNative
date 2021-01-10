import {Action as ReduxAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Action, ActionContent, createAction, createActionContent} from "../utils/ActionUtils";
import {ActionIdentifier} from "./store";
import {find, findIndex, replace} from "../utils/Utils";
import {clearSession, loadSession} from "./otherActions";

export interface ActionState {
    items: Action[],
    createdAction?: Action,
}

const initialState: ActionState = {
    items: []
}

const slice = createSlice({
    name: "action",
    initialState,
    reducers: {
        addAction(state: ActionState, reduxAction: ReduxAction) {
            const action = createAction(state.items);
            state.items.push(action);
            state.createdAction = action;
        },
        cloneAction(state: ActionState, reduxAction: PayloadAction<ActionIdentifier>) {
            const actionId = reduxAction.payload.actionId;
            const actions = state.items;
            const base = find(actions, actionId);

            if (!base) {
                throw `Action with id [${actionId}] not found to clone`;
            }

            const action = createAction(actions, "Copy of " + base.name, base.desc, base.contents);
            state.items.push(action);
            state.createdAction = action;
        },
        updateAction(state: ActionState, reduxAction: PayloadAction<Action>) {
            replace(state.items, reduxAction.payload, true);
        },
        deleteAction(state: ActionState, reduxAction: PayloadAction<ActionIdentifier>) {
            const actionId = reduxAction.payload.actionId;
            const actions = state.items;

            const action = find(actions, actionId);
            if (!action) {
                throw `Action with id [${actionId}] not found to delete`;
            }

            const index = findIndex(actions, action);
            if (index >= 0) {
                actions.splice(index, 1);
            }
        },
        addRow(state: ActionState, reduxAction: PayloadAction<ActionIdentifier>) {
            const actionId = reduxAction.payload.actionId;
            const actions = state.items;

            const action = find(actions, actionId);
            if (!action){
                throw `Action with id [${actionId}] not found to add row`;
            }

            action.contents.push(createActionContent(action.contents));
        },
        updateRow(state: ActionState, reduxAction: PayloadAction<{parent: ActionIdentifier, row: ActionContent}>) {
            const actionId = reduxAction.payload.parent.actionId;
            const content = reduxAction.payload.row;
            const actions = state.items;

            const action = find(actions, actionId);
            if (!action) {
                throw `Action with id [${actionId}] not found to update row`;
            }

            replace(action.contents, content, true)
        },
        deleteRow(state: ActionState, reduxAction: PayloadAction<ActionIdentifier>) {

        },
        clearCreatedAction(state: ActionState, reduxAction: ReduxAction) {
            state.createdAction = undefined;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadSession, (state: ActionState, reduxAction) => {
                state.items = reduxAction.payload.actions;
            })
            .addCase(clearSession, (state: ActionState, reduxAction) => {
                return initialState;
            })
    }
});

export const {addAction, cloneAction, updateAction, deleteAction, addRow, updateRow, deleteRow, clearCreatedAction} = slice.actions;

export default slice.reducer;
