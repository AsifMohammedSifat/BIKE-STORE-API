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
exports.ProductController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bike_service_1 = require("./bike.service");
//1. Create a Bike
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the saved bike
        const savedBike = yield bike_service_1.BikeService.createBikeServiceToDB(req.body);
        // return the saved bike data
        if (res.headersSent)
            return;
        res.status(201).json({
            message: 'Bike created successfully',
            success: true,
            data: savedBike,
        });
    }
    catch (err) {
        // handle validation errors
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            const errors = Object.entries(err.errors).map(([key, error]) => {
                // here i am checking if the error is a ValidatorError and if properties exist
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
//2. Get All Bikes
const getAllBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeService.getAllBikeFromDB();
        res.send({
            message: 'Bikes retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Sorry! No Bike found',
            success: false,
            err,
        });
    }
});
//3. Get a Specific Bike
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bikeId;
        const result = yield bike_service_1.BikeService.getSingleBikeFromDB(id);
        res.send({
            message: 'Bikes retrieved successfully!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Sorry! No Bike found',
            success: false,
            err,
        });
    }
});
//4. Update a Bike
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bikeId;
        const data = req.body;
        const result = yield bike_service_1.BikeService.updateBikeToDB(id, data);
        res.send({
            message: 'Bike Updated successfully!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.json({
            message: 'Sorry! Update failed. No data found. :(',
            success: false,
            err,
        });
    }
});
//5. Delete a Bike
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bikeId;
        const result = yield bike_service_1.BikeService.deleteBikeFromDB(id);
        if (result) {
            res.send({
                message: 'Bike deleted successfully',
                status: true,
                data: {},
            });
        }
        else {
            res.send({
                message: 'Sorry! No Bike found',
                status: true,
                data: {},
            });
        }
    }
    catch (err) {
        res.json({
            message: 'Sorry! No Bike found',
            success: false,
            err,
        });
    }
});
exports.ProductController = {
    createBike,
    getAllBike,
    getSingleBike,
    updateBike,
    deleteBike,
};
