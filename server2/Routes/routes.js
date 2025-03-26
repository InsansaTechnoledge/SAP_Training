import authRoutes from './auth.routes.js';

const route = (app) => {
  app.use('/api/v1/auth' , authRoutes)
}

export default route;