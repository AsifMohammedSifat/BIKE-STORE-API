"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const router = express_1.default.Router();
router.post('/', bike_controller_1.ProductController.createBike);
router.get('/', bike_controller_1.ProductController.getAllBike);
router.get('/:bikeId', bike_controller_1.ProductController.getSingleBike);
router.put('/:bikeId', bike_controller_1.ProductController.updateBike);
router.delete('/:bikeId', bike_controller_1.ProductController.deleteBike);
exports.ProductRoute = router;
