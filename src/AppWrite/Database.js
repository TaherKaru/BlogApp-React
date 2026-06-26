import config from "../config/config";
import { Client, Account, Databases, ID, Storage, Query } from "appwrite";

export class service {

    client;
    database;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId);
        this.database = new Databases(this.client)
    }

    async createPost({ title, featuredImage, slug, content, status, userId }) {
        try {
            return await this.database.createDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: error :: create post", error);
            return false;
        }
    }

    async updatePost(slug, { title, featuredImage, content, status }) {
        try {
            return await this.database.updateDocument(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
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
            return await this.database.listDocuments(
                config.AppWriteDatabaseId,
                config.AppWriteCollectionId,
                [queries]
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