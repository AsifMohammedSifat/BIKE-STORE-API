import { Request, Response } from 'express';
import { OrderService } from './order.service';
import mongoose from 'mongoose';

// 6. Order a Bike
export const createOrder = async (req: Request, res: Response) => {
  try {
    //get data
    const data = req.body;

    //pass and received data from db
    const result = await OrderService.createOrderToDB(data);

    //successfully created
    res.status(201).json({
      message: 'Order created successfully!',
      status: true,
      data: result,
    });
  } catch (err: unknown) {
    // handle validation errors
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.entries(err.errors).map(([key, error]) => {
        // here checking if the error is a ValidatorError and if properties exist
        const errorDetails: any = {
          message: error.message,
          path: error.path,
          value: error.value,
          kind: error.kind || 'Unknown',
        };

        if (
          error instanceof mongoose.Error.ValidatorError &&
          error.properties
        ) {
          errorDetails.properties = { ...error.properties };
        }

        return {
          [key]: errorDetails,
        };
      });

      if (res.headersSent) return;
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
      if (res.headersSent) return;
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: err.message,
        stack: err.stack || 'No stack trace available',
      });
    }

    // default error response for unexpected errors
    if (res.headersSent) return;
    res.status(500).json({
      message: 'Unexpected error occurred',
      success: false,
      error: 'Unknown error',
    });
  }
};

// 7. Calculate Revenue from Orders (Aggregation)
export const revenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'Something went wrong',
      status: false,
    });
  }
};

export const OrderController = {
  createOrder,
  revenue,
};
