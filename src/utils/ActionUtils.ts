import {Table} from "./TableUtils";
import {clone} from "./Utils";

export interface Element {
    name: string;
    desc: string;
    group: string;
}

export interface Unique {
    key: string;
}

export interface ActionContent extends Unique{
    table: string;
    field?: string;
}

export interface Action extends Element, Unique {
    contents: ActionContent[];
}
