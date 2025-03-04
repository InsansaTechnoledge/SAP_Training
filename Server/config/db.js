import mongoose from "mongoose";
import sdk from "node-appwrite";
if (process.env.NODE_ENV !== "production") {
    (await import("dotenv")).config();
}

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log(`mongoDB connected on ${mongoose.connection.host}`);
    }
    catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

export const connectAppwriteDB = async () => {


    try {
        const client = new sdk.Client();

        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_DB_PROJECTID)
            .setKey(process.env.APPWRITE_DB_APIKEY);

        const databases = new sdk.Databases(client);

        console.log("Appwrite connected successfully");
        // const Sap=await databases.get(process.env.APPWRITE_DBID);
        const sap = await databases.listCollections(process.env.APPWRITE_DBID);
        // console.log(sap.collections[0].$id);
        // console.log(await databases.getCollection(process.env.APPWRITE_DBID,sap.collections[0].$id));

    }
    catch (err) {
        console.log("Appwrite connection failed", err);
        process.exit(1);
    }

}

