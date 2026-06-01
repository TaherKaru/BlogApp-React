import config from "../config/config";
import { Client, Account, Databases, ID, Storage, Query } from "appwrite";

export class service {

    client;
    database;

    constructor() {
        this.client = new Client()
            .setEndpoint("https://fra.cloud.appwrite.io/v1")
            .setProject('6a1a6b0a002be50e5192');
        this.database = new Databases(this.client)
    }

    async createPost({ title, featuredimage, slug, content, status, userId }) {
        try {
            await this.database.createDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {
                    title,
                    featureimage,
                    content,
                    status,
                    userId
                }
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: error :: create post")
            return false;
        }
    }

    async updatePost(slug, { title, featuredimage, content, status }) {
        try {
            return await this.database.updateDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {
                    title,
                    featuredimage,
                    content,
                    status

                }
            )
        } catch (error) {
            console.log("Appwrite service :: error :: updatePost", error)
        }

    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: error :: getpost")
        }

    }

    async getPosts(queries = Query.equal('status', 'active')) {
        try {
            return await this.database.getDocuments(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: error :: getPosts", error)
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug
            )
            return true;

        } catch (error) {
            console.log("Appwrite service :: error :: deletePost", error);
            return false;
        }
    }


}

const Service = new service()
export default Service