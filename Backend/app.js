import connectMongo from "./config/DB/MongoDB.js";
import express from 'express';

const App = async () => {
    try{

        await connectMongo();
        const app = express();

        return app;
    }
    catch(err){
        console.log(err)
    }
}

export default App;