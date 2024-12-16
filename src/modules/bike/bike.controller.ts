import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BikeService } from './bike.service';

//1. Create a Bike
const createBike = async (req: Request, res: Response) => {
  try {
    // get the saved bike
    const savedBike = await BikeService.createBikeServiceToDB(req.body);

    // return the saved bike data
    if (res.headersSent) return;
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: savedBike,
    });
  } catch (err: unknown) {
    // handle validation errors
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.entries(err.errors).map(([key, error]) => {
        // here i am checking if the error is a ValidatorError and if properties exist
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

//2. Get All Bikes
const getAllBike = async (req: Request, res: Response) => {
  try {
    const result = await BikeService.getAllBikeFromDB();
    res.send({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.json({
      message: 'Sorry! No Bike found',
      success: false,
      err,
    });
  }
};

//3. Get a Specific Bike
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.bikeId;
    const result = await BikeService.getSingleBikeFromDB(id);
    res.send({
      message: 'Bikes retrieved successfully!',
      status: true,
      data: result,
    });
  } catch (err) {
    res.json({
      message: 'Sorry! No Bike found',
      success: false,
      err,
    });
  }
};

//4. Update a Bike
const updateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.bikeId;
    const data = req.body;
    const result = await BikeService.updateBikeToDB(id, data);
    res.send({
      message: 'Bike Updated successfully!',
      status: true,
      data: result,
    });
  } catch (err) {
    res.json({
      message: 'Sorry! Update failed. No data found. :(',
      success: false,
      err,
    });
  }
};

//5. Delete a Bike
const deleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.bikeId;
    const result = await BikeService.deleteBikeFromDB(id);
    if (result) {
      res.send({
        message: 'Bike deleted successfully',
        status: true,
        data: {},
      });
    } else {
      res.send({
        message: 'Sorry! No Bike found',
        status: true,
        data: {},
      });
    }
  } catch (err) {
    res.json({
      message: 'Sorry! No Bike found',
      success: false,
      err,
    });
  }
};

export const ProductController = {
  createBike,
  getAllBike,
  getSingleBike,
  updateBike,
  deleteBike,
};
