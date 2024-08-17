const config = {
    appwriteurl: String(import.meta.env.Vite_APPWRITE_URL),
    appwriteprojectId: String(import.meta.env.Vite_PROJECT_ID),
    appwritedatbaseId: String(import.meta.env.VITE_DATBASE_ID),
    appwritecollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwritebucketId: String(import.meta.env.VITE_BUCKET_ID),
}


export default config;