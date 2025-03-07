import courseRoutes from './courseRoutes.js';
import videoRoutes from './videoRoutes.js';
import contentRoutes from './contentRoutes.js';
import quizRoutes from  './quizRoutes.js';
import moduleRoutes from './moduleRoutes.js';

const routes = (app) => {
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/contents', contentRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/modules', moduleRoutes);
}

export default routes;