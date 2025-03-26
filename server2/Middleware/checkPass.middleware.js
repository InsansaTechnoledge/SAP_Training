import User from '../Models/user.model.js';
import { APIError } from '../Utils/ApiError.js';

export const checkPassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('+password');

        // console.log(user)

        const { newpassword, oldpassword } = req.body;

        // console.log(oldpassword)

        const isMatch = await user.comparePassword(oldpassword);
        if (!isMatch) {
            return res.json(new APIError(400, 'incorrect password'));
        }
        if (newpassword === oldpassword) {
            return res.json(
                new APIError(
                    400,
                    'new password can not be same as old password'
                )
            );
        }
        next();
    } catch (e) {
        return res.json(new APIError(500, e.message));
    }
};
