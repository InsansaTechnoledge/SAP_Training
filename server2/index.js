await import('./Config/env.js');
import { PORT } from './Config/env.js';

const app = (await import('./app.js')).default;

const initialize = async () => {
    try {
        const appInstance = await app();

        appInstance.get('/', (req, res) => {
            console.log('server is live ');
            res.status(200).json({
                message: 'server is running',
            });
        });

        appInstance.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err, 'There was an error initializing the server');
    }
};

initialize();
