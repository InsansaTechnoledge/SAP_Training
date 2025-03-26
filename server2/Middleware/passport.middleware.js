import passport from "passport";
import { APIError } from "../Utils/ApiError.js";

export const authenticateMiddleware = async (req , res , next ) =>  {

    passport.authenticate('local', (err, user , info) => {
        // console.log(info);
        if(err) return res.json(new APIError(400, err))

        if(!user){
            return res.json(new APIError(400 , info?.message || "user not found"))
        }

        req.logIn(user, (e) => {
            if(e) return res.json(new APIError(500,e.message))
            return next(); 
        })
    })(req, res, next);

    
}