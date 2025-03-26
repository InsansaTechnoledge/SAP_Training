import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from '../Utils/Passport.js';
import route from '../routes/routes.js';
import NODE_ENV from './env.js';
import { MONGO_URI, SESSION_KEY } from './env.js';

const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({ extended: true }));

ExpressApp.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

ExpressApp.use(cookieParser());

ExpressApp.use(
    session({
        secret: SESSION_KEY, // Change this to a strong secret
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            collectionName: 'sessions', // Name of the collection in MongoDB
            ttl: 1 * 24 * 60 * 60, // Session expires in 14 days
        }),
        cookie: {
            httpOnly: true,
            secure: NODE_ENV !== 'development',
            sameSite: NODE_ENV === 'development' ? 'lax' : 'none',
            domain: NODE_ENV === 'development' ? 'localhost' : 'auto',
            maxAge: 1 * 24 * 60 * 60 * 1000,
            // maxAge: 1 * 1 * 1 * 10 * 1000,
        }, // Set secure: true if using HTTPS
    })
);

ExpressApp.use(passport.initialize());
ExpressApp.use(passport.session()); // If using sessions

route(ExpressApp);

export default ExpressApp;
