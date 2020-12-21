import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  username:{
      type:String,
      unique:true
  },
  email:{
    type:String,
    unique:true
},
password:{
    type:String,
    unique:true
},
roles: [{
    type: Schema.Types.ObjectId,
    ref:'Role'
}]
},
{
    timestamps:true,
    versionKey:false
});




//THIS METHOD ENCRYPT THE PASSWORD
userSchema.statics.encryptPassword = async (password)=>{
   const salt = await bcrypt.genSalt(10) //run the algorithm 10 times
   return await bcrypt.hash(password, salt)


};
//THIS METHOD COMPARE THE PASSWORD
userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword)

}

export default model('User',userSchema);