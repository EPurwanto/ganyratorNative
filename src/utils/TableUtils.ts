import {ActionContent} from "./ActionUtils";
import {Element, getUniqueId, handleUpdate, Unique} from "./Utils";

export interface TableContent extends Unique {
    parent: string
    weight: number;
    element: string;
    action?: string | ActionContent[];
}

export interface Table extends Element, Unique {
    totalWeight: number;
    contents: TableContent[];
}

export async function createTableContent(parent: Table, element?: string, weight?: number, action?: string | ActionContent[]): Promise<TableContent> {
    return {
        parent: parent.key,
        weight: weight || 1,
        element: element || "Element " + (parent.contents.length + 1),
        action: action,
        key:  await getUniqueId(parent.contents),
    }
}

export async function createTable(peers: Table[], name?: string, desc?: string, contents?: TableContent[]) : Promise<Table> {
    return {
        name: name || "New Table " + (peers.length + 1),
        desc: desc || "Empty Table",
        totalWeight: getTotalWeight(contents || []),
        contents: contents || [],
        key:  await getUniqueId(peers),
    };
}

export function getDummyTable(name?: string, desc?: string, contents?: TableContent[]) {
    return {
        name: name || "This is a dummy table",
        desc: desc || "You shouldn't be seeing this",
        totalWeight: getTotalWeight(contents || []),
        contents: contents || [],
        key:  "NOT A REAL KEY",
    }
}

function getTotalWeight(contents: TableContent[]) {
    let w = 0;
    contents.forEach(r => {
        w += r.weight;
    });
    return w;
}

export function rollOn(table: Table) {
    if (!table.totalWeight) {
        console.log("Bailing because total weight was not calculated")
        return;
    }

    const roll = Math.floor(Math.random() * table.totalWeight);

    let counter = 0;
    for (let i = 0; i < table.contents.length; i++) {
        const row = table.contents[i];
        counter += row.weight;

        if (counter > roll) {
            return row;
        }
    }
}

export function handleUpdateTables(originalList: Table[], update?: Table | Table[], add?: Table | Table[], remove?: Table | Table[]) {
    if (update) {
        const toUpdate = Array.isArray(update) ? update : [update];

        toUpdate.forEach((t) => {t.totalWeight = getTotalWeight(t.contents)})
    }

    return handleUpdate(originalList, update, add, remove);
}
