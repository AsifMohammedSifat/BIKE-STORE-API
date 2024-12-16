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
exports.OrderController = exports.revenue = exports.createOrder = void 0;
const order_service_1 = require("./order.service");
const mongoose_1 = __importDefault(require("mongoose"));
// 6. Order a Bike
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get data
        const data = req.body;
        //pass and received data from db
        const result = yield order_service_1.OrderService.createOrderToDB(data);
        //successfully created
        res.status(201).json({
            message: 'Order created successfully!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        // handle validation errors
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            const errors = Object.entries(err.errors).map(([key, error]) => {
                // here checking if the error is a ValidatorError and if properties exist
                const errorDetails = {
                    message: error.message,
                    path: error.path,
                    value: error.value,
                    kind: error.kind || 'Unknown',
                };
                if (error instanceof mongoose_1.default.Error.ValidatorError &&
                    error.properties) {
                    errorDetails.properties = Object.assign({}, error.properties);
                }
                return {
                    [key]: errorDetails,
                };
            });
            if (res.headersSent)
                return;
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: err.name,
                    errors: Object.assign({}, ...errors),
                },
                stack: err.stack || 'No stack trace available',
            });
        }
        // handle other errors
        if (err instanceof Error) {
            if (res.headersSent)
                return;
            res.status(500).json({
                message: 'Something went wrong',
                success: false,
                error: err.message,
                stack: err.stack || 'No stack trace available',
            });
        }
        // default error response for unexpected errors
        if (res.headersSent)
            return;
        res.status(500).json({
            message: 'Unexpected error occurred',
            success: false,
            error: 'Unknown error',
        });
    }
});
exports.createOrder = createOrder;
// 7. Calculate Revenue from Orders (Aggregation)
const revenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.OrderService.calculateRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || 'Something went wrong',
            status: false,
        });
    }
});
exports.revenue = revenue;
exports.OrderController = {
    createOrder: exports.createOrder,
    revenue: exports.revenue,
};
