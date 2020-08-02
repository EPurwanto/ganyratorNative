import {Action, Element, Unique} from "./ActionUtils";
import {getUniqueId} from "./Utils";

export interface TableContent extends Unique{
    weight: number;
    element: string;
    action?: string | Action;
}

export interface Table extends Element, Unique {
    totalWeight: number;
    contents: TableContent[];
}

export async function createTable(peers: Table[], name="New", desc="", contents: TableContent[] = []): Promise<Table> {
    return {
        name: name,
        desc: desc,
        group: "",
        totalWeight: getTotalWeight(contents),
        contents: contents,
        key:  await getUniqueId(peers),
    };
}

export async function createTableContent(peers: TableContent[], element?: string, weight?: number, action?: string | Action): Promise<TableContent> {
    return {
        weight: weight || 1,
        element: element || "Element",
        action: action,
        key:  await getUniqueId(peers),
    }
}

function getTotalWeight(contents: TableContent[]) {
    let w = 0;
    contents.forEach(r => {
        w += r.weight;
    });
    return w;
}
