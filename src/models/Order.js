import {Schema, model} from 'mongoose'

const orderSchema = new Schema({
    description: String,
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