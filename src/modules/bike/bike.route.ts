import express from 'express';
import { ProductController } from './bike.controller';

const router = express.Router();

router.post('/', ProductController.createBike);
router.get('/', ProductController.getAllBike);
router.get('/:bikeId', ProductController.getSingleBike);
router.put('/:bikeId', ProductController.updateBike);
router.delete('/:bikeId', ProductController.deleteBike);

export const ProductRoute = router;
