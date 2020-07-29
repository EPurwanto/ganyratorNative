import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";

export interface Session {
    tables: Table[];
    actions: Action[];
}

export default class SessionStorage {

}
