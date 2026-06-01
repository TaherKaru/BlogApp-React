import { Client, Account, ID } from 'appwrite';
import config from '../config/config';

export class Authenticate {

    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(config.AppWriteUrl)
            .setProject(config.AppWriteProjectId);
        this.account = new Account(this.client)
    }

    async signUp({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount

            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password)
            return userAccount
        } catch (error) {
            throw error
        }

    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error ");
        }
    }

    async passwordRecovery({ email }) {
        try {
            const userRecovery = await this.account.createRecovery(email, config.AppWriteRecoveryAccountUrl)
            return userRecovery;
        } catch (error) {
            console.log("appwrite service :: error :: Password Recovery", error);

        }
    }

}

const service = new Authenticate()

export default service 
