import {Element, find, getUniqueId, Unique} from "./Utils";
import {rollOn, Table} from "./TableUtils";
import {PickerItem} from "./component/CustomPicker";

export interface ActionContent extends Unique{
    table?: string;
    field?: string;
}

export interface Action extends Element, Unique {
    contents: ActionContent[];
}

export interface ActionResults extends Unique {
    root: string;
    values: Map<string, string>;
}

export function createActionContent(peers: ActionContent[], table?: string, field?: string) {
    return {
        table: table,
        field: field,
        key: getUniqueId(peers),
    }
}

export function createAction(peers: Action[], name?: string, desc?: string, contents?: ActionContent[]) {
    return {
        name: name || "New Action " + (peers.length + 1),
        desc: desc || "Empty action",
        contents: contents || [],
        key:  getUniqueId(peers),
    };
}

export function getDummyAction(name?: string, desc?: string, contents?: ActionContent[]) {
    return {
        name: name || "This is a dummy action",
        desc: desc || "You shouldn't be seeing this",
        contents: contents || [],
        key: "NOT A REAL KEY",
    }
}

export function performAction(call: string, action: ActionContent[], tables: Table[], actions: Action[]) {
    let results : ActionResults = {
        root: call,
        values: new Map<string, string>(),
        key: ""
    };

    console.log(`Rolling ${call} with ${action.length} entries`);

    action.forEach((act) => {
        if (!act.table) {
            console.log("Bailing because table was invalid")
            return;
        }

        const table = find(tables, act.table);

        if (table) {
            const row = rollOn(table);

            if (!row) {
                console.log("Bailing because result was invalid")
                return;
            }

            if (act.field) {
                results.values.set(act.field, row.element);
                console.log("Rolled: " + act.field + " -> " + row.element)
            } else {
                results.values.set(table.name, row.element);
                console.log("Rolled: " + table.name + " -> " + row.element)
            }

            let childAct: ActionContent[] | undefined;
            if(typeof row.action === "string") {
                childAct = find(actions, row.action)?.contents;
            } else {
                childAct = row.action;
            }

            // TODO change this to a BFS

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
