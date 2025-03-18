import passport from "passport";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const LocalStrategry = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new LocalStrategry({ usernameField: "email"}, async (email, password, done) => {
        try{
            const user = await User.findOne({ email });
            if(!user){
                return done(null, false, { message: "User not found" });
            }

            // check for google signin
            console.log("check for google signin");
            const isGoogleSignin = await User.findOne({_id: user._id, googleId : { $exists: true}});
            if(isGoogleSignin){
                return done(null, false, {message: "Email already signed in with google"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return done(null, false, {message: "Incorrect Password"});
            }

            return done(null, user);
        }
        catch(err){
            return done(err);
        }
    })
);


passport.use(

    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try{
            let user = await User.findOne({googleId: profile.id});
            if(!user){
                // check for local signin
                console.log("check for local signin");
                const existingUser = await User.findOne({email: profile.emails[0].value});
                
                console.log(existingUser);
                
                if(existingUser){
                    // return done(null, false, { message: "Existing local account found. Do you want to link it with Google?" });
                    const updatedUser = await User.findOneAndUpdate({email: existingUser.email}, {googleId: profile.id});
                    console.log(updatedUser);
                    return done(null, updatedUser, `google sign in set for ${profile.emails[0].value}`); 
                }
                else{
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    });

                    await user.save();

                    return done(null, user, "new user created");    
                }
                
            }
            return done(null, user);    


        }
        catch(err){ 
            return done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id); // Save only user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
export default passport;
