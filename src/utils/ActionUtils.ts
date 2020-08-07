import {Element, find, getUniqueId, Unique} from "./Utils";
import {rollOn, Table, TableContent} from "./TableUtils";

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

export async function createActionContent(peers: ActionContent[], table?: string, field?: string) {
    return {
        table: table,
        field: field,
        key: await getUniqueId(peers),
    }
}

export async function createAction(peers: Action[], name?: string, desc?: string, contents?: ActionContent[]): Promise<Action> {
    return {
        name: name || "New Action",
        desc: desc || "Empty action",
        group: "",
        contents: contents || [],
        key:  await getUniqueId(peers),
    };
}

export function getDummyAction(name?: string, desc?: string, contents?: ActionContent[]) {
    return {
        name: name || "This is a dummy action",
        desc: desc || "You shouldn't be seeing this",
        group: "",
        contents: contents || [],
        key: "NOT A REAL KEY",
    }
}

export function groupActions(actions: Action[]) {
    const actionMap = new Map<string, Action[]>();

    actions.forEach(act => {
        if (!actionMap.has(act.group)) {
            actionMap.set(act.group, []);
        }
        actionMap.get(act.group)?.push(act);
    });

    return actionMap;
}

export function performAction(call: string, action: ActionContent[], tables: Table[], actions: Action[]) {
    let results : ActionResults = {
        root: call,
        values: new Map<string, string>(),
        key: ""
    };

    console.log("Rolling: ");
    console.log(action);

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
                console.log("Rolled: " + act.field + ", " + row.element)
            } else {
                results.values.set(table.name, row.element);
                console.log("Rolled: " + table.name + ", " + row.element)
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
