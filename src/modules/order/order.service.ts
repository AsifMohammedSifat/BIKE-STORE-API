import { BikeModel } from '../bike/bike.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

//6. Order a Bike
const createOrderToDB = async (orderInfo: TOrder) => {
  const { email, product, quantity } = orderInfo;

  // check--> is target product exits to db
  const productInfo = await BikeModel.findById(product);

  if (!productInfo) {
    throw new Error('Product not found!');
  }

  // check --> is target product available to store
  if (productInfo.quantity < quantity) {
    throw new Error(
      ` Insufficient Product. Total Availability: ${productInfo.quantity}`,
    );
  }

  // calculating --> total price
  const calculatedTotalPrice = quantity * productInfo.price;

  // create --> Order
  const order = new OrderModel({
    email,
    product,
    quantity,
    totalPrice: calculatedTotalPrice,
  });
  await order.save();

  // udpate the product
  productInfo.quantity -= quantity;
  productInfo.inStock = productInfo.quantity > 0;
  await productInfo.save();

  return order;
};

// 7. Calculate Revenue from Orders (Aggregation)
const calculateRevenue = async () => {
  const revenueResult = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  // console.log(revenueResult);
  return revenueResult[0]?.totalRevenue || 0;
};

export const OrderService = {
  createOrderToDB,
  calculateRevenue,
};
