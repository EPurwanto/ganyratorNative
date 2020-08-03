import AsyncStorage from "@react-native-community/async-storage";
import {Table} from "./TableUtils";


export interface ISession {
    id: string;
    tables: Table[];
}

class SessionStorage {
    async Load() {
        const data = await AsyncStorage.getItem("session");

        if (data == null) {
            throw new Error("No session to load");
        }

        const session = JSON.parse(data) as ISession;

        console.log("Loaded: " + session.id);
        return session;
    };

    async Save(session: ISession) {
        const data = JSON.stringify(session);
        await AsyncStorage.setItem("session", data);
        console.log("Saved: " + session.id);
    };

    async Clear() {
        await AsyncStorage.removeItem("session")
    }
}

export default new SessionStorage();
