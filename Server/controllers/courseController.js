import {AppwriteDB} from '../config/db.js';
import {Query} from 'node-appwrite';
if(process.env.NODE_ENV !== "production"){
    (await import ("dotenv")).config();
}

export const getCoursCard=async(req,res)=>{
    try{
        console.log("Inside getCourseCard");
        const courseCard=await AppwriteDB.listDocuments(
            process.env.APPWRITE_DBID,
            process.env.APPWRITE_DBC_Course,
           [ Query.select(["title",'description','price','category','stars','validity','image'])]
        );
        console.log(courseCard.documents);
         res.status(200).json(courseCard.documents);
    }catch(error){
        console.log("data fetching error in getCourseCards ",error);
        res.status(400).json({message:"Something went wrong"});
    }
}