const nodeEnv = "development"

if(nodeEnv !== "production"){
    const dotenv = await import('dotenv');
    dotenv.config( {path: `./.env.${nodeEnv}.local`});
}

// console.log(process.env);
export const {PORT, MONGO_URI, SESSION_KEY} = process.env;

export default nodeEnv