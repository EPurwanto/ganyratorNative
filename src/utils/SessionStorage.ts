import AsyncStorage from "@react-native-community/async-storage";
import {Table} from "./TableUtils";


export interface ISession {
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

        const session = JSON.parse(data) as ISession;

        console.log("Loaded: " + session.text);
        return session;
    };

    async Save(session: ISession) {
        const data = JSON.stringify(session);
        await AsyncStorage.setItem("session", data);
        console.log("Saved: " + session.text);
    };

    async Clear() {
        await AsyncStorage.removeItem("session")
    }
}

export default new SessionStorage();
