import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './modules/bike/bike.route';
import { OrderRoute } from './modules/order/order.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to Bike Store API</h1>
    <h2>API Endpoints</h2>
    <p>Visit our live API at: <a href="https://bike-store-api-seven.vercel.app/" target="_blank">https://bike-store-api-seven.vercel.app/</a></p>
    <ul>
      <li>
        <strong>1. Create a Bike</strong><br>
        <strong>Method:</strong> POST /api/products<br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/products" target="_blank">https://bike-store-api-seven.vercel.app/api/products</a><br>
        <strong>Request Body:</strong>
        <pre>
          {
            "name": "Xtreme Mountain Bike",
            "brand": "Giant",
            "price": 1200,
            "category": "Mountain",
            "description": "A high-performance bike built for tough terrains.",
            "quantity": 50,
            "inStock": true
          }
        </pre>
      </li>
      <li>
        <strong>2. Get All Bikes</strong><br>
        <strong>Method:</strong> GET /api/products<br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/products" target="_blank">https://bike-store-api-seven.vercel.app/api/products</a><br><br>
      </li>
      <li>
        <strong>3. Get a Specific Bike</strong><br>
        <strong>Method:</strong> GET /api/products/:productId<br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/products/67609898a58acb07355ab88c" target="_blank">https://bike-store-api-seven.vercel.app/api/products/67609898a58acb07355ab88c</a><br>
        <strong>Example:</strong> /api/products/648a45e5f0123c45678d9012
        <br><br>
      </li>
      <li>
        <strong>4. Update a Bike</strong><br>
        <strong>Method:</strong> PUT /api/products/:productId<br>        
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/products/676098a3a58acb07355ab88e" target="_blank">https://bike-store-api-seven.vercel.app/api/products/676098a3a58acb07355ab88e</a><br>

        <strong>Request Body:</strong>
        <pre>
{
  "price": 1300,
  "quantity": 30
}
        </pre>
      </li>
      <li>
        <strong>5. Delete a Bike</strong><br>
        <strong>Method:</strong> DELETE /api/products/:productId <br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/products/676098a3a58acb07355ab88e" target="_blank">https://bike-store-api-seven.vercel.app/api/products/676098a3a58acb07355ab88e</a><br>
        <br><br>
      </li>
      <li>
        <strong>6. Order a Bike</strong><br>
        <strong>Method:</strong> POST /api/orders<br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/orders" target="_blank">https://bike-store-api-seven.vercel.app/api/orders</a><br>
        <strong>Request Body:</strong>
        <pre>
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 2400
}
        </pre>
      </li>
      <li>
        <strong>7. Calculate Revenue from Orders (Aggregation)</strong><br>
        <strong>Method:</strong> GET /api/orders/revenue <br>
        <strong>URL:</strong> <a href="https://bike-store-api-seven.vercel.app/api/orders/revenue" target="_blank">https://bike-store-api-seven.vercel.app/api/orders/revenue</a><br>
      </li>
    </ul>
  `);
});


// Prodcut route
app.use('/api/products/', ProductRoute);
//Order Route
app.use('/api/orders/', OrderRoute);

export default app;
