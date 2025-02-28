import express from 'express'
if(process.env.NODE_ENV !== 'production'){
    (await import('dotenv')).config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



export default app;
