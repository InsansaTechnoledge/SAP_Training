import courseRoutes from './courseRoutes.js';
const routes = (app) => {
app.use('/api/v1/courses', courseRoutes);
}

export default routes;