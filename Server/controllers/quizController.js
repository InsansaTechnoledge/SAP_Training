import { Query } from "node-appwrite";
import { AppwriteDB } from "../config/db.js";

export const getQuizById = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    const quiz = await AppwriteDB.listDocuments(
        process.env.APPWRITE_DBID,
        process.env.APPWRITE_DBC_Quiz,
        [Query.equal('contentId', id)]
    );

    // console.log(quiz.documents[0]);
    res.status(200).json(quiz.documents[0]);
}