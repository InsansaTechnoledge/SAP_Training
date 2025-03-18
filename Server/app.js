import expressApp from './config/express.js'
import {connectMongoDB, connectAppwriteDB} from './config/db.js'

const App = async () => {
    try{
        await connectMongoDB();
        await connectAppwriteDB();

        return expressApp;
    }
    catch(err){
        console.log("Error while starting the app. Error : ", err);
        process.exit(1);
    }
}

export default App;