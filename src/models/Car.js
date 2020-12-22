import {Schema, model} from 'mongoose'

const carSchema = new Schema({
    brand: String,
    model:String,
    year:Number,
    priceForDay:Number,
    state:Number
},
{
    timestamps:true,
    versionKey:false
}
)

export default model('Car',carSchema);