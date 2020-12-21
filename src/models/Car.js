import {Schema, model} from 'mongoose'

const carSchema = new Schema({
    brand: String,
    model:String,
    year:Number,
    priceForDay:Number
})

export default model('Car',carSchema);