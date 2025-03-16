import mongoose from "mongoose";
import sdk from "node-appwrite";
if (process.env.NODE_ENV !== "production") {
    (await import("dotenv")).config();
}

export let AppwriteDB='';
const setter=(databases)=>{
    AppwriteDB=databases;
    // console.log(AppwriteDB);  
}

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log(`mongoDB connected on ${mongoose.connection.host}`);
    }
    catch (err) {
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

export const connectAppwriteDB = async () => {
    try{
    const client =  new sdk.Client();

        client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_DB_PROJECTID)
            .setKey(process.env.APPWRITE_DB_APIKEY);

        const databases = new sdk.Databases(client);
        setter(databases);
        databases.get
        console.log("Appwrite connected successfully");        

    }
    catch (err) {
        console.log("Appwrite connection failed", err);
        process.exit(1);
    }

}

