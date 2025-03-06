import { Query } from "node-appwrite";
import { AppwriteDB } from "../config/db.js";

export const getVideoContent=async(req,res)=>{
    try{
        const id=req.query.id;
        console.log(id);
        const details=await(AppwriteDB.getDocument(process.env.Appwrite_DBID,process.env.APPWRITE_DBC_Module,id,
            [Query.select(["$id","name","contentId.*"])]
        ));
        console.log(details);
        const content=details.contentId.filter(content => content.type === "video").map(content =>({
            $id:content.$id,
            title:content.title,
            position:content.position,
            duration:content.duration
        })
        );
        details.contentId=content;
        res.status(200).json(details);
    }catch(err){
        console.log("error fetching video",err);
    }
}

export const getQuizContent=async(req,res)=>{
    try{
        const id=req.query.id;
        console.log(id);
        const details=await(AppwriteDB.getDocument(process.env.Appwrite_DBID,process.env.APPWRITE_DBC_Module,id,
            [Query.select(["$id","name","contentId.*"])]
        ));
        console.log(details);
        const content=details.contentId.filter(content => content.type === "quiz").map(content =>({
            $id:content.$id,
            title:content.title,
            position:content.position,
            duration:content.duration
        })
        );
        details.contentId=content;
        res.status(200).json(details);
    }catch(err){
        console.log("error fetching video",err);
    }
}