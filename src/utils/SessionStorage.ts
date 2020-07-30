import AsyncStorage from "@react-native-community/async-storage";


export interface ISession {
    // tables: Table[];
    // actions: Action[];
    text: string;
}

export function Session(text: string = "") : ISession {
    return {
        text: text
    }
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
}

export default new SessionStorage();
