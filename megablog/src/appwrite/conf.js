import { Client, Databases, ID, Query, Storage } from "appwrite"
import config from "../config/config";

export class Service {
    client = new Client()
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectId)
        this.Databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userid }) {
        try {
            return await this.Databases.createDocument(
                config.appwritedatbaseId,
                config.appwritecollectionId,
                slug, {
                title, content, featuredImage, status, userid
            }
            )
        } catch (error) {
            throw error
        }
    }



    async updatePost({ title, slug, content, featuredImage, status, }) {
        try {
            return await this.Databases.updateDocument(
                config.appwritedatbaseId,
                config.appwritecollectionId, slug,
                {
                    title, featuredImage, content, status
                }
            )
        } catch (error) {
            throw error
        }
    }


    async deleteDoc(slug) {
        try {
            await this.Databases.deleteDocument(
                config.appwritedatbaseId,
                config.appwritecollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("this is error");

            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                config.appwritecollectionId,
                config.appwritedatbaseId,
                slug
            )
        } catch (error) {
            console.log("this is fetching log", error);

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.Databases.listDocuments(
                config.appwritecollectionId,
                config.appwritedatbaseId,
                queries
            )
        } catch (error) {
            console.log(" here is mistake");

        }
    }


    /// file upload code

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwritebucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("fetching error is ready");
            return false

        }
    }
    // file delete

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwritebucketId,
                fileId
            )
        } catch (error) {
            console.log("fetching error ");
            return false
        }
    }
    // for file previve 
    getFilePrevivew(fileId) {
        return this.bucket.getFilePrevivew(
            Config.appwritebucketId,
            fileId
        )
    }


}


const service = new Service()

export default service