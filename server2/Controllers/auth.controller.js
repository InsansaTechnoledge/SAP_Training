import { APIResponse } from "../Utils/ApiResponse.js"
import User from "../Models/user.model.js";
import { APIError } from "../Utils/ApiError.js";

// function to sign-in user
export const registerUser = async (req , res , next) => {
    // const {name,email,password} = req.body
    try{
        const user = await User.create(req.body)

        if (user) {
            return res.json(new APIResponse(200, user, "User created successfully"));
        }
    } catch(e){
        return res.json(new APIError(400,e.message))
    }
}

// function to login user 
export const loginUser = async (req, res, next) => {
    try{
        const rememberMeBoolean = req.body.rememberMe

        if(rememberMeBoolean) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 
        }
        else{
            req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000 
        }

        return res.json(new APIResponse(200,"user loggedIn successfully"))
    } catch (e) {
        res.json(new APIError(500, e.message))
    }
}

// function to log user out 

export const logoutUser = async (req, res, next) => {
    try{

        console.log(req.session)

    } catch(e) {
        res.json( new APIError(500, e.message))
    }
}

