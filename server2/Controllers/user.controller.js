import User from "../Models/user.model.js"
import { APIError } from "../Utils/ApiError.js"
import { APIResponse } from "../Utils/ApiResponse.js"

export const changePassword = async(req , res ) => {
    try{

        const {newPassword} = req.body
        const passwordChanged = await User.findByIdAndUpdate(req.user._id, {password : newPassword})

        if(passwordChanged) {
            res.json(new APIResponse(200, "password changed successfully"))
        }
    } catch(e) {
        res.json(new APIError(500, ["enable to change password",e.message]))
    }
}