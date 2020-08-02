import {Unique} from "./ActionUtils";
// @ts-ignore
import {nanoid} from "nanoid/async/index.native.js";

export type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function fetchFromJson(url: string, successCallback: (response:any)=> void, errorCallback: (error:any)=> void) {
    fetch(url)
        .then(response => response.json(), error => errorCallback(error))
        .then(result => {
            successCallback(result)
        }, error => {
            errorCallback(error);
        });
}

export function handleUpdate<T>(list: T[], add?: T, remove?: T | T[]) {
    if (remove) {
        if (Array.isArray(remove)) {
            remove.forEach(item => {
                const index = list.indexOf(item);
                if (index >= 0) {
                    list.splice(index, 1);
                }
            })
        } else {
            const index = list.indexOf(remove);
            if (index >= 0) {
                list.splice(index, 1);
            }
        }
    }

    if (add) {
        if (Array.isArray(add)) {
            list.unshift(...add);
        } else {
            list.unshift(add);
        }
    }

    return list;
}

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export async function getUniqueId(peers: Unique[]) {
    let id = await nanoid();

    while (!isUnique(id, peers)) {
        id = await nanoid();
    }
    return id;
}

export function isUnique(key: string, peers: Unique[]) {
    return peers.filter((p) => p.key == key).length == 0;
}
