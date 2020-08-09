import AsyncStorage from "@react-native-community/async-storage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";


export interface ISession {
    id: string;
    actions: Action[];
    tables: Table[];
}

class SessionStorage {
    async Load() {
        const data = await AsyncStorage.getItem("session");

        if (data == null) {
            throw new Error("No session to load");
        }

        const session = JSON.parse(data) as ISession;

        console.log(`Loaded: ${session.id} containing ${session.tables?.length ?? 0} tables and ${session.actions?.length ?? 0} actions`);
        return session;
    };

    async Save(session: ISession) {
        const data = JSON.stringify(session);
        await AsyncStorage.setItem("session", data);
        console.log(`Saved: ${session.id} containing ${session.tables?.length ?? 0} tables and ${session.actions?.length ?? 0} actions`);
    };

    async Clear() {
        console.log("All session data cleared");
        await AsyncStorage.removeItem("session");
    }
}

export default new SessionStorage();
