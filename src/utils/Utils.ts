// @ts-ignore
import {nanoid} from "nanoid/async/index.native.js";

export interface Element {
    name: string;
    desc: string;
    group: string;
}

export interface Unique {
    key: string;
}


export function fetchFromJson(url: string, successCallback: (response:any)=> void, errorCallback: (error:any)=> void) {
    fetch(url)
        .then(response => response.json(), error => errorCallback(error))
        .then(result => {
            successCallback(result)
        }, error => {
            errorCallback(error);
        });
}

export function handleUpdate<T extends Unique>(originalList: T[], update?: T | T[], add?: T | T[], remove?: T | T[]) {
    const list = originalList.slice();

    if (update) {
        if (Array.isArray(update)) {
            update.forEach(item => {
                const index = findIndex(list, item);
                if (index >= 0) {
                    list[index] = item;
                }
            })
        } else {
            const index = findIndex(list, update);
            if (index >= 0) {
                list[index] = update;
            }
        }
    }

    if (remove) {
        if (Array.isArray(remove)) {
            remove.forEach(item => {
                const index = findIndex(list, item);
                if (index >= 0) {
                    list.splice(index, 1);
                }
            })
        } else {
            const index = findIndex(list, remove);
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

export function findIndex(list: Unique[], item: Unique) {
    return list.findIndex((val) => val.key == item.key);
}

export function find<T extends Unique>(list: T[], key: string) {
    return list.find((val) => val.key == key)
}
