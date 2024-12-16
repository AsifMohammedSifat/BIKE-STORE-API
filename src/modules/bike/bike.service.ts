import { TBike } from './bike.interface';
import { BikeModel } from './bike.model';

//1. Create a Bike
const createBikeServiceToDB = async (bikeData: TBike) => {
  const bike = new BikeModel(bikeData);
  const savedBike = await bike.save();
  return savedBike;
};

//2. Get All Bikes
const getAllBikeFromDB = async () => {
  return await BikeModel.find();
};

//3. Get a Specific Bike
const getSingleBikeFromDB = async (bikeId: string) => {
  return await BikeModel.findById(bikeId);
};

//4. Update a Bike
const updateBikeToDB = async (bikeId: string, data: TBike) => {
  return await BikeModel.findByIdAndUpdate(bikeId, data, {
    new: true, // it will return --> the updated document
    runValidators: true, //it wil be run --> schemaa validation
  });
};

//5. Delete a Bike
const deleteBikeFromDB = async (bikeId: string) => {
  return await BikeModel.findByIdAndDelete(bikeId);
};

export const BikeService = {
  createBikeServiceToDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeToDB,
  deleteBikeFromDB,
};
