import courseRoutes from './courseRoutes.js';
import videoRoutes from './videoRoutes.js';

const routes = (app) => {
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/videos', videoRoutes);
}

export default routes;