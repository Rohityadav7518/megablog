import { Client, Account, ID } from "appwrite"
import config from "../config/config";

export class AuthService {
    client = new Client()
    Account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectId)
        this.account = new Account(this.client)
    }
    async createAccount({ Email, Password, Name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), Email, Password, Name)
            if (userAccount) {
                /// return user account
                console.log(userAccount);

                return this.login({ Email, Password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    /// anotgher methnod

    async login({ Email, Password }) {
        try {
            const logged = await this.account.createEmailSession(Email, Password)

            if (logged) {
                return logged;
            } else {
                return error
            }
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("here ie error", error);

        }
        return null;
    }


    async logout() {
        try {
            await this.account.deleteSessions()

        } catch (error) {
            console.log("apppwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService

