import express from 'express'
import routes from '../routes/routes.js';
if(process.env.NODE_ENV !== 'production'){
    (await import('dotenv')).config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

routes(app);



export default app;
