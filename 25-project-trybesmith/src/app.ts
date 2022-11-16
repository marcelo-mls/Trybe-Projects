import express from 'express';
import routes from './routes/product.routes';
import httpErrorMiddleware from './utils/middlewares';

const app = express();

app.use(express.json());

app.use(routes);

app.use(httpErrorMiddleware);

export default app;
