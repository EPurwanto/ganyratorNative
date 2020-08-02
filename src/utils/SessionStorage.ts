import AsyncStorage from "@react-native-community/async-storage";
import {Table} from "./TableUtils";


export interface ISession {
    // tables: Table[];
    // actions: Action[];
    text: string;
    id: string;
    tables: Table[];
}

class SessionStorage {
    async Load() {
        const data = await AsyncStorage.getItem("session");

        if (data == null) {
            throw new Error("No session to load");
        }

        return JSON.parse(data) as ISession;
    };

    async Save(session: ISession) {
        const data = JSON.stringify(session);
        await AsyncStorage.setItem("session", data);
    };

    async Clear() {
        await AsyncStorage.removeItem("session")
    }
}

export default new SessionStorage();
