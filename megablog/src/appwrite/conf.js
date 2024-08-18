import { Client, Databases, ID, Query, Storage } from "appwrite"
import config from "../config/config";

export class Service {
    client = new Client()
    Databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userid }) {
        try {
            return await this.Databases.createDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
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
                config.appwriteDatbaseId,
                config.appwriteCollectionId, slug,
                {
                    title, featuredImage, content, status
                }
            )
        } catch (error) {
            throw error
        }
    }


    async deletePost(slug) {
        try {
            await this.Databases.deleteDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
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
                config.appwriteCollectionId,
                config.appwriteDatbaseId,
                slug
            )
        } catch (error) {
            console.log("this is fetching log", error);

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.Databases.listDocuments(
                config.appwriteCollectionId,
                config.appwriteDatbaseId,
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
                config.appwriteBucketId,
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
                config.appwriteBucketId,
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
            config.appwriteBucketId,
            fileId
        )
    }


}


const service = new Service()

export default service