import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const route = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);
};

export default route;
