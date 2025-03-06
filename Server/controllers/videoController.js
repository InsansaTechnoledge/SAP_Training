import { Query } from "node-appwrite";
import { AppwriteDB } from "../config/db.js";

export const getVideoById = async (req, res) => {
    try {

        const id = req.query.id;
        console.log(id);

        const video = await AppwriteDB.listDocuments(
            process.env.APPWRITE_DBID,
            process.env.APPWRITE_DBC_Video,
            [Query.equal('contentId', id)]
        );
        res.status(200).json(video.documents[0]);
    }
    catch (err) {
        console.log("error fetching video", err);
    }

}