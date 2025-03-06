import { AppwriteDB } from "../config/db.js";

export const get=async(req,res)=>{
    const Sap=await AppwriteDB.listCollections(process.env.APPWRITE_DBID);
    console.log(Sap);
}