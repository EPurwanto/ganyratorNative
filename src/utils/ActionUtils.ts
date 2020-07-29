export interface Element {
    name: string;
    desc: string;
    group: string;
}

export interface ActionContent {
    table: string;
    field?: string;
}

export interface Action extends Element {
    contents: ActionContent[];
}
