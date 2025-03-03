import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)

        console.log(`mongoDB connected on ${mongoose.connection.host}`);
    }
    catch(err){
        console.log("MongoDB connection failed", err);
        process.exit(1);
    }
}

export const connectAppwriteDB = async () => {

}

