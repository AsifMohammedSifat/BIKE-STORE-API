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

    // handle --> if result is null or not found
    if (!result) {
      throw new Error('Sorry! No Bike found with the provided ID');
    }

    res.send({
      message: 'Bikes retrieved successfully!',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Sorry! No Data found with the provided ID',
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      data: {},
    });
  }
};

// 4. Update a Bike
const updateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.bikeId;

    // handle if bikeId is not provided in the URL
    if (!id) {
      throw new Error('Bike ID is required to update the bike');
    }

    const data = req.body;
    const result = await BikeService.updateBikeToDB(id, data);

    // handle if result is null or not found
    if (!result) {
      throw new Error('Sorry! No bike found with the provided ID');
    }

    res.send({
      message: 'Bike updated successfully!',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      message: 'Sorry! No bike found with the provided ID',
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      data: {},
    });
  }
};

//5.  Delete a Bike
const deleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.bikeId;

    // check if bikeId exists or not
    if (!id) {
      throw new Error('Bike ID is required to delete a bike');
    }

    const result = await BikeService.deleteBikeFromDB(id);

    if (result) {
      // iff the bike is found and deleted
      res.status(200).send({
        message: 'Bike deleted successfully!',
        status: true,
        data: {},
      });
    } else {
      // if no bike is found with the provided ID
      throw new Error('Sorry! No bike found with the provided ID!');
    }
  } catch (err) {
    res.status(500).json({
      message: 'Sorry! No data found with the provided ID!',
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      data: {},
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
