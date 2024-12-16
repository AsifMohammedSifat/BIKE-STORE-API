import { model, Schema } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Bike brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Electric', 'Hybrid'],
        message: '{VALUE} is not valid',
      },
      default: 'Mountain',
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BikeModel = model<TBike>('Bike', bikeSchema);
