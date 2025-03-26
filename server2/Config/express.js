import express from 'express';
import route from '../Routes/routes.js';


const ExpressApp = express();

ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({ extended: true }));

route(ExpressApp);

export default ExpressApp;