import App from "./app.js";
const PORT = 3000;


const initializeServer = async () => {

    try{
        const app = await App()

        app.get('/', (req, res) => {
            res.send('Server is running perfectly !!');
        });

        // Start listening on the specified port
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(err){
        console.log("In index.js",err)
    }
}

initializeServer();