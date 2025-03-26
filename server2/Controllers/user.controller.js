import User from '../Models/user.model.js';
import { APIError } from '../Utils/ApiError.js';
import { APIResponse } from '../Utils/ApiResponse.js';

export const changePassword = async (req, res) => {
    try {
        const { newpassword } = req.body;
        // const passwordChanged = await User.findByIdAndUpdate(req.user._id, {password : newPassword})

        const user = await User.findById(req.user._id).select('+password');

        // console.log(user)

        if (user) {
            user.password = newpassword;
            const passwordChanged = await user.save();

            if (passwordChanged) {
                res.json(new APIResponse(200, 'password changed successfully'));
            }
        }
    } catch (e) {
        res.json(new APIError(500, ['enable to change password', e.message]));
    }
};
