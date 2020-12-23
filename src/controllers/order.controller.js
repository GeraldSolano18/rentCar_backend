import Order from "../models/Order";
import User from "../models/User";
import Car from "../models/Car";
import jwt from "jsonwebtoken";
import config from "../config";

export const createOrder = async (req, res) => {
  try {
    const { carId } = req.params
    const token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, config.SECRET)

    const newOrder = new Order(req.body)
    newOrder.orders = decoded.id;
    const carFound = await Car.findById(carId)

    if (!carFound) return res.status(404).json({ message: "This car does not exists" })
  
    newOrder.car = carId
    await newOrder.save()
    res.status(201).json(newOrder)

  } catch (error) {
    return res.status(400).json({ error: error })
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find()
  res.status(200).json(orders);
};

//this user has solicited these cars
export const getOrdersByUser = async (req, res) =>{
    const { userId } = req.params;
    const foundOrders = await Order.find({user:{$in: userId}}).populate('car')
    const mapOrders= foundOrders.map(obj =>obj.car)     
    res.status(200).json(mapOrders);
}

//accept order el Car.state = 1 (1 refers to a car in use)
// AND orderState will be true
//accepting an order will change the status of the car to not available

export const acceptOrder = async (req, res) =>{
  const { orderId } = req.params;
  const updatedOrder= await Order.findByIdAndUpdate(orderId,{orderState:true},{
    new:true
});
  await Car.findByIdAndUpdate(updatedOrder.car,{state:1},{
    new:true
});

res.status(200).json(updatedOrder);
}


//finalize order the Car.state = 0 AND orderState will be true
//accepting an order will change the status of the car to not available

export const finalizeOrder = async (req, res) =>{
  const { orderId } = req.params;
  const updatedOrder= await Order.findByIdAndUpdate(orderId,{orderState:false},{
    new:true
});
  await Car.findByIdAndUpdate(updatedOrder.car,{state:0},{
    new:true
});

res.status(200).json(updatedOrder);
}