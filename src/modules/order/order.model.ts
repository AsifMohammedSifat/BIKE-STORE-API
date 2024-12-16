import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Invalid email format',
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BikeModel',
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      min: [1, 'Quantity must be at least 1'],
      required: [true, 'Quantity is required'],
    },
    totalPrice: {
      type: Number,
      min: [0, 'Total price cannot be negative'],
      required: [true, 'Total price is required'],
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = model<TOrder>('Order', orderSchema);
export default OrderModel;
