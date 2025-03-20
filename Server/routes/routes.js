import courseRoutes from './courseRoutes.js';
import videoRoutes from './videoRoutes.js';
import contentRoutes from './contentRoutes.js';
import quizRoutes from  './quizRoutes.js';
import moduleRoutes from './moduleRoutes.js';
import authRoutes from './authRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import emailRoutes from './emailRoutes.js';

const routes = (app) => {
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/contents', contentRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/email', emailRoutes);
}

export default routes;