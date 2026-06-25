import config from "../config/config";

import { Client,Storage, ID } from "appwrite";

export class storageService {

    client;
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId);
        this.bucket = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.AppWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);

        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.AppWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }

    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.AppWriteBucketId,
            fileId
        )
    }

}

const storage = new storageService();
export default storage
