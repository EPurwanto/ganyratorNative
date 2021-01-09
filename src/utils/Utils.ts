import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Element {
    name: string;
    desc: string;
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
            list.push(...add);
        } else {
            list.push(add);
        }
    }

    return list;
}

export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function getUniqueId(peers: Unique[]) {
    let id = uuidv4();

    while (!isUnique(id, peers)) {
        id = uuidv4();
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

export function replace<T extends Unique>(list: T[], item: T, inPlace = false) {
    list = inPlace ? list : [...list]
    const index = findIndex(list, item);
    if (index >= 0) {
        list[index] = item;
    }
    return list;
}
