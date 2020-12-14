import AsyncStorage from "@react-native-community/async-storage";
import {Table} from "./TableUtils";
import {Action} from "./ActionUtils";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";


export interface ISession {
    id: string;
    actions: Action[];
    tables: Table[];
}

interface SessionFormat {
    version: number,
}

export interface ExportResponse {
    success: boolean,
    filename?: string,
    message?: string,
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

    async Export(session: ISession) {
        const toSave = {
            format: 1,
            ...session,
        }

        return MediaLibrary.getPermissionsAsync()
            .then(response => {
                if (!response.granted && response.canAskAgain)
                    return MediaLibrary.requestPermissionsAsync();
                return response
            })
            .then(response => {
                if (response.granted)
                    return FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "test.json", JSON.stringify(toSave))
                else throw "PermissionRequired"
            })
            .then( () => {
                return MediaLibrary.createAssetAsync(FileSystem.documentDirectory + "test.json")
            })
            .then((asset) => {
                console.log(`Exported: ${session.id} containing ${session.tables?.length ?? 0} tables and ${session.actions?.length ?? 0} actions`);
                return {
                    success: true,
                    filename: asset.filename,
                } as ExportResponse
            })
            .catch(e => {
                    return Promise.resolve<ExportResponse>({
                        success: false,
                        message: e,
                    })
                }
            )
    }

    async Clear() {
        console.log("All session data cleared");
        await AsyncStorage.removeItem("session");
    }
}

export default new SessionStorage();
