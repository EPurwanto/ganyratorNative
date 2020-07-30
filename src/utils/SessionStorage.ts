import {AsyncStorage} from "react-native";

export interface ISession {
    // tables: Table[];
    // actions: Action[];
    text: string;
    loaded: boolean;
}

export function Session(text: string = "", loaded: boolean = false) : ISession {
    return {
        text: text,
        loaded: loaded
    }
}

class SessionStorage {
    async Load() {
        const data = await AsyncStorage.getItem("session");

        if (data == null) {
            throw new Error("No session to load");
        }

        const session = JSON.parse(data) as ISession;
        session.loaded = true;
        return session;
    };

    async Save(session: ISession) {
        const data = JSON.stringify(session);
        await AsyncStorage.setItem("session", data);
    };
}

export default new SessionStorage();
