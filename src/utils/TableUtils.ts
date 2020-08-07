import {ActionContent} from "./ActionUtils";
import {Element, getUniqueId, Unique} from "./Utils";

export interface TableContent extends Unique{
    weight: number;
    element: string;
    action?: string | ActionContent[];
}

export interface Table extends Element, Unique {
    totalWeight: number;
    contents: TableContent[];
}

export async function createTableContent(peers: TableContent[], element?: string, weight?: number, action?: string | ActionContent[]): Promise<TableContent> {
    return {
        weight: weight || 1,
        element: element || "Element",
        action: action,
        key:  await getUniqueId(peers),
    }
}

export async function createTable(peers: Table[], name?: string, desc?: string, contents?: TableContent[]) : Promise<Table> {
    return {
        name: name || "New Table",
        desc: desc || "Empty Table",
        group: "",
        totalWeight: getTotalWeight(contents || []),
        contents: contents || [],
        key:  await getUniqueId(peers),
    };
}

export function getDummyTable(name?: string, desc?: string, contents?: TableContent[]) {
    return {
        name: name || "This is a dummy table",
        desc: desc || "You shouldn't be seeing this",
        group: "",
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
