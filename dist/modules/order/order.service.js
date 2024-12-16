"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const bike_model_1 = require("../bike/bike.model");
const order_model_1 = __importDefault(require("./order.model"));
//6. Order a Bike
const createOrderToDB = (orderInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity } = orderInfo;
    // check--> is target product exits to db
    const productInfo = yield bike_model_1.BikeModel.findById(product);
    if (!productInfo) {
        throw new Error('Product not found!');
    }
    // check --> is target product available to store
    if (productInfo.quantity < quantity) {
        throw new Error(` Insufficient Product. Total Availability: ${productInfo.quantity}`);
    }
    // calculating --> total price
    const calculatedTotalPrice = quantity * productInfo.price;
    // create --> Order
    const order = new order_model_1.default({
        email,
        product,
        quantity,
        totalPrice: calculatedTotalPrice,
    });
    yield order.save();
    // udpate the product
    productInfo.quantity -= quantity;
    productInfo.inStock = productInfo.quantity > 0;
    yield productInfo.save();
    return order;
});
// 7. Calculate Revenue from Orders (Aggregation)
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const revenueResult = yield order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    // console.log(revenueResult);
    return ((_a = revenueResult[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.OrderService = {
    createOrderToDB,
    calculateRevenue,
};
