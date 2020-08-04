import {Element, find, Unique} from "./Utils";
import {rollOn, Table} from "./TableUtils";

export interface ActionContent extends Unique{
    table: string;
    field?: string;
}

export interface Action extends Element, Unique {
    contents: ActionContent[];
}

export interface ActionResults extends Unique {
    root: string;
    values: Map<string, string>;
}

export function performAction(call: string, action: ActionContent[], tables: Table[], actions: Action[]) {
    let results : ActionResults = {
        root: call,
        values: new Map<string, string>(),
        key: ""
    };

    action.forEach((act) => {
        const table = find(tables, act.table);

        if (table) {
            const row = rollOn(table);

            if (!row) {
                return;
            }

            if (act.field) {
                results.values.set(act.field, row.element);
            } else {
                results.values.set(table.name, row.element);
            }

            let childAct: ActionContent[] | undefined;
            if(typeof row.action === "string") {
                childAct = find(actions, row.action)?.contents;
            } else {
                childAct = row.action;
            }

            if (childAct){
                performAction(row.element, childAct, tables, actions).values.forEach((val, key) => {
                    results.values.set(key, val);
                })
            }
        } else {
            console.log("Unable to find table " + act.table)
        }
    });

    return results;
}
