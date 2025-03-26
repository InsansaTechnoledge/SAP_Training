import { APIResponse } from "../Utils/ApiResponse.js"
import User from "../Models/user.model.js";

export const registerUser = async (req , res , next) => {

    const {name,email,password} = req.body

    console.log(name,email,password);

    const user = await new User.create({
        fullname: name,
        email,
        password
    })

    if(user){
        new APIResponse(200,user,"user create successfully")
    }
    
}