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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeService = void 0;
const bike_model_1 = require("./bike.model");
//1. Create a Bike
const createBikeServiceToDB = (bikeData) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = new bike_model_1.BikeModel(bikeData);
    const savedBike = yield bike.save();
    return savedBike;
});
//2. Get All Bikes
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bike_model_1.BikeModel.find();
});
//3. Get a Specific Bike
const getSingleBikeFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bike_model_1.BikeModel.findById(bikeId);
});
//4. Update a Bike
const updateBikeToDB = (bikeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bike_model_1.BikeModel.findByIdAndUpdate(bikeId, data, {
        new: true, // it will return --> the updated document
        runValidators: true, //it wil be run --> schemaa validation
    });
});
//5. Delete a Bike
const deleteBikeFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bike_model_1.BikeModel.findByIdAndDelete(bikeId);
});
exports.BikeService = {
    createBikeServiceToDB,
    getAllBikeFromDB,
    getSingleBikeFromDB,
    updateBikeToDB,
    deleteBikeFromDB,
};
