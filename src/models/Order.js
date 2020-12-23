import {Schema, model} from 'mongoose'

const orderSchema = new Schema({
    orderState:Boolean,
    description: {
        type: String,
        required:[true, "please enter an Name"],
    },
    created: { 
    type: Date, 
    default: Date.now },
    dateFinalize: { 
        type: Date, 
        required:[true, "please enter an date"],
       },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    car:{
        type: Schema.Types.ObjectId,
        ref:'Car'  
    }

},
{
    timestamps:true,
    versionKey:false
})

export default model('Order',orderSchema);