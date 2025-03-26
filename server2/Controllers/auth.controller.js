import { APIResponse } from "../Utils/ApiResponse.js"
import User from "../Models/user.model.js";
import { APIError } from "../Utils/ApiError.js";
import passport from "passport";
import { BACKEND_URL, CLIENT_BASE_URL } from "../Config/env.js";

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

// function to login user with last login details
export const loginUser = async (req, res, next) => {
    try{
        const lastLogin = Date.now();

        const rememberMeBoolean = req.body.rememberMe

        if(rememberMeBoolean) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 
        }
        else{
            req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000 
        }

        await User.findByIdAndUpdate(req.user._id, {lastLogin:lastLogin})

        return res.json(new APIResponse(200,"user loggedIn successfully"))
    } catch (e) {
        res.json(new APIError(500, e.message))
    }
}

// function to log user out 
export const logoutUser = async (req, res, next) => {
    try{

       req.logout((err) => {
        if(err) return res.json(new APIError(500, err.message))

        req.session.destroy((err) => {
            if(err) return res.json(new APIError(500, err.message))

            res.clearCookie("connect.sid")
            res.json(new APIResponse(200,"logged out succcesfully"))
        })
       })

    } catch(e) {
        res.json( new APIError(500, e.message))
    }
}


// function to login with google
export const googleAuth = passport.authenticate('google', {
    scope: ["profile", "email"], session:true
});

export const googleCallback = passport.authenticate('google' , {
    successRedirect: `${BACKEND_URL}/api/v1/auth/profile`,
    faliureRedirect: `${CLIENT_BASE_URL}` , 
    session: true
})

export const googleProfile = (req, res) => {
    if(!req.user) return res.json(new APIError(401, "unauthorized"))

    res.redirect(`${CLIENT_BASE_URL}`);
}

// chek auth function , for checking cookies 
export const checkAuth = async (req, res, next) => {
    if(req.user) return res.json(new APIResponse(200, {user: req.user}, "session found"))
    
    else res.json(new APIError(400, "session not found"))
}

// 