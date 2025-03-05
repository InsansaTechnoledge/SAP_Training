import App from "./app.js";
import { addQuestionsToQuiz } from "./controllers/questionController.js";
const PORT = process.env.PORT || 5000;


const initializeServer = async () => {
    try{

        const app = await App();
        
        app.get('/', (req,res) => {
            res.status(200).json("Server is running perfectly !!!");
        });
        
        addQuestionsToQuiz();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    }
    catch(err){
        console.log("Error in initializing server. Error : ",err);
        process.exit(1);
    }
};

if (process.env.NODE_ENV!=='serverless'){
    initializeServer();
}

export default App;