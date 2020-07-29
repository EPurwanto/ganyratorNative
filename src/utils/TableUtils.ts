import {Action, Element} from "./ActionUtils";

export interface TableContent {
    weight: number;
    element: string;
    action?: string | Action;
}

export interface Table extends Element {
    totalWeight: number;
    contents: TableContent[];
}
