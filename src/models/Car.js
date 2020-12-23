import {Schema, model} from 'mongoose'

const carSchema = new Schema({
    brand:{
        type:String,
        required:[true, "please enter an brand"]
     },
    model:{
        type:String,
         required:[true, "please enter a model"]
     },
    year:{
        type:Date,
         required:[true, "please enter an year"]
     },
    priceForDay:{
       type:Number,
        required:[true, "please enter an price"]
    },
    state:{
        type:Number,
         required:[true, "please enter an state"]
     }
},
{
    timestamps:true,
    versionKey:false
}
)

export default model('Car',carSchema);