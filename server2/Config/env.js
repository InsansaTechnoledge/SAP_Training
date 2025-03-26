const nodeEnv = 'development';

if (nodeEnv !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config({ path: `./.env.${nodeEnv}.local` });
}

// console.log(process.env);
export const {
    PORT,
    MONGO_URI,
    SESSION_KEY,
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
    BACKEND_URL,
    CLIENT_BASE_URL,
} = process.env;

export default nodeEnv;
