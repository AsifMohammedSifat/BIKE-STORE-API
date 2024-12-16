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
    res.send('Hello World!');
});
// Prodcut route
app.use('/api/products/', bike_route_1.ProductRoute);
//Order Route
app.use('/api/orders/', order_route_1.OrderRoute);
exports.default = app;
