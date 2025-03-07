import { Query } from "node-appwrite";
import { AppwriteDB } from "../config/db.js";

export const getModulesByCourseId = async (req, res) => {
    try {
        const id = req.query.id;

        const course = await AppwriteDB.getDocument(
            process.env.APPWRITE_DBID,
            process.env.APPWRITE_DBC_Course,
            id
        );

        console.log(course.moduleId);
        const modules = course.moduleId;
        res.status(200).json(modules);
    }
    catch (err) {
        console.log("error fetching modules", err);
    }

}