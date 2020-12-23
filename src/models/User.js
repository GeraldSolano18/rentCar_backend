import { Schema, model } from "mongoose";

import bcrypt from "bcryptjs";

const {isEmail} = require('validator');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required:[true, "please enter an Username"],
      unique: true,
      lowercase:true,  
      minlength:[3, 'Minimum username length is 3 characters']

    },
    name: {
        type: String,
        required:[true, "please enter an Name"],
        unique: true,
        lowercase:true,  
        minlength:[3, 'Minimum name length is 3 characters']
    },
    email: {
      type: String,
      required:[true, "please enter an Email"],
      unique: true,
      validate: [isEmail,'please enter a valid email']
      
    },
    password: {
      type: String,
      required:[true, "please enter an password"],
    },
    phone: {
      type: Number,
      required:[true, "please enter an phone number"],  
      minlength:[8, 'Minimum password length is 8 characters']
    },
    address: {
      type: String,
      required:[true, "please enter an address"],
      minlength:[10, 'Minimum password length is 10 characters']
    },

    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//THIS METHOD ENCRYPT THE PASSWORD
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //run the algorithm 10 times
  return await bcrypt.hash(password, salt);
};
//THIS METHOD COMPARE THE PASSWORD
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
