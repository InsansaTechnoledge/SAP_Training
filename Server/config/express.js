import express from 'express'
import routes from '../routes/routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './passport.js';
const app = express();

app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        secret: process.env.SESSION_KEY, // Change this to a strong secret
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions", // Name of the collection in MongoDB
            ttl: 1 * 24 * 60 * 60, // Session expires in 14 days
        }),
        cookie: { 
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            domain: process.env.NODE_ENV === "development" ? "localhost" : "auto",
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            // maxAge: 1 * 1 * 1 * 10 * 1000, 
        }, // Set secure: true if using HTTPS
    })
);

app.use(passport.initialize());
app.use(passport.session()); // If using sessions

routes(app);



export default app;
