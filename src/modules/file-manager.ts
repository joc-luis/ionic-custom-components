import {FilePicker, PickFilesResult} from "@capawesome/capacitor-file-picker";
import {FileInfo} from "../models/file-info.ts";
export class FileManager {
    public static async pick(types: string[], multiple: boolean = false){
        const result: PickFilesResult = await FilePicker.pickFiles({
            types,
            multiple
        });

        const files: FileInfo[] = [];

        result.files.forEach(pick => {
            const file: FileInfo = {
                path: pick.path,
                name: pick.name,
                data: pick.data as string,
                mimeType: pick.mimeType
            };

            files.push(file)
        });

        return files;
    }
}