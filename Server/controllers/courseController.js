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
           [ Query.select(["title",'description','price','category','stars','validity','image','moduleCourseFeatureId'])]
        );
        console.log(courseCard.documents);
         res.status(200).json(courseCard.documents);
    }catch(error){
        console.log("data fetching error in getCourseCards ",error);
        res.status(400).json({message:"Something went wrong"});
    }
}

export const getcourseById = async (req,res) => {
    try{
        const id = req.query.id;
        var course = await AppwriteDB.getDocument(
            process.env.APPWRITE_DBID,
            process.env.APPWRITE_DBC_Course,
            id
        );

        const filteredModules = course.moduleId.map(module => ({
            $id: module.$id,
            description: module.description,
            name: module.name,
            moduleCourseFeatureId: module.moduleCourseFeatureId,
            position: module.position,
            price: module.price,
            contentId: module.contentId.map(content => ({
                $id: content.$id,
                title: content.title,
                position: content.position,
                duration: content.duration,
                type: content.type
            })),
        }));

        course = {
            ...course,
            moduleId: filteredModules
        }

        res.status(200).json(course);
    }
    catch(err){

    }
}