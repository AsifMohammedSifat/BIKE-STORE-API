"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bike_route_1 = require("./modules/bike/bike.route");
const order_route_1 = require("./modules/order/order.route");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`
   <h1>Welcome to Bike Store API</h1>
<h2>API Endpoints</h2>
<ul>
  <li>
    <strong>1. Create a Bike</strong><br>
    <strong>Method:</strong> POST /api/products<br>
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
    <strong>Query Parameters:</strong> ?searchTerm=category
  </li>
  <li>
    <strong>3. Get a Specific Bike</strong><br>
    <strong>Method:</strong> GET /api/products/:productId<br>
    <strong>Example:</strong> /api/products/648a45e5f0123c45678d9012
  </li>
  <li>
    <strong>4. Update a Bike</strong><br>
    <strong>Method:</strong> PUT /api/products/:productId<br>
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
    <strong>Method:</strong> DELETE /api/products/:productId
  </li>
  <li>
    <strong>6. Order a Bike</strong><br>
    <strong>Method:</strong> POST /api/orders<br>
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
    <strong>Method:</strong> GET /api/orders/revenue
  </li>
</ul>

  `);
});
// Prodcut route
app.use('/api/products/', bike_route_1.ProductRoute);
//Order Route
app.use('/api/orders/', order_route_1.OrderRoute);
exports.default = app;
