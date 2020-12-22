import Car from "../models/Car";

//this endpoint gets all cars
export const getCars = async (req, res) => {
  const cars = await Car.find();
  res.status(200).json(cars);
};
//this endpoint get a car by ID
export const getCarrById = async (req, res) => {
  const { carId } = req.params;
  const car = await Car.findById(carId);
  res.status(200).json(car);
};

//this endpoint create a car
export const createCar = async (req, res) => {
  const { brand, model, year, priceForDay, state } = req.body;
  const newCar = new Car({
    brand,
    model,
    year,
    priceForDay,
    state,
  });
  const savedCar = await newCar.save();
  res.status(200).json(savedCar);
};

//this endpoint updates a car
export const  updateCar = async (req, res)=>{   
    const {carId} = req.params;
    const updateCar= req.body;

    const updatedCar= await Car.findByIdAndUpdate(carId,updateCar,{
        new:true
    });
    res.status(200).json(updatedCar);
}
//t
export const  deleteCar = async (req, res)=>{   
    try {
        const {carId} = req.params;
        await Car.findByIdAndRemove(carId);
         res.status(204).json({message: "CAR deleted"});  
    }catch (error) {
        return res.status(400).json({error:error})
    }
    
    }