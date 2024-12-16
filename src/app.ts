import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './modules/bike/bike.route';
import { OrderRoute } from './modules/order/order.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Prodcut route
app.use('/api/products/', ProductRoute);
//Order Route
app.use('/api/orders/', OrderRoute);

export default app;
