import passport from 'passport';
import bcrypt from 'bcryptjs'
import User from '../models/UserModel.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.status(200).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!user) {
                return res.status(400).json({ message: info.message });
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }

                // req.session.user = user;

                // Store user data in session
                // req.session.user = user;

                // Check if "Remember Me" is selected
                const rememberMe = req.body.rememberMe;

                if (rememberMe) {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
                } else {
                    req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // Ends when browser closes
                    // req.session.cookie.maxAge = 1 * 1 * 1 * 10 * 1000; // Ends when browser closes
                }


                res.status(200).json({ message: "User login successful", user });
            })
        })(req, res, next);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export const checkAuth = async (req, res) => {

    if (req.user) {
        return res.status(200).json({ message: "session found", user: req.user }); // User is authenticated, continue to next middleware or route
    } else {
        return res.status(200).json({ message: "Session not found" });
    }
};

export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"], session: true });

export const googleCallback = passport.authenticate("google",{
    // successRedirect:`${process.env.CLIENT_BASE_URL}`,
    successRedirect:`${process.env.BACKEND_URL}/api/v1/auth/profile`,
    failureRedirect: `${process.env.CLIENT_BASE_URL}`,
    session: true
})

export const googleProfile = (req,res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    res.redirect(`${process.env.CLIENT_BASE_URL}`);
    // return res.json(req.user); // Return user profile
}

export const logout = (req, res) => {
    
    console.log(req.session);
    req.logout((err) => { 
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to destroy session", error: err });
            }
            res.clearCookie("connect.sid");  // Remove session cookie
            return res.status(200).json({ message: "User logged out successfully" });
        });
    });

}

