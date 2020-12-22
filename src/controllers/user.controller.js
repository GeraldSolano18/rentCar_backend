import User from "../models/User";
import Role from '../models/Role';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
};

export const  createUser = async (req, res)=>{
    const { username, email, password, roles}= req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    if(roles){
        const foundRoles = await Role.find({name:{$in: roles}})
        newUser.roles= foundRoles.map(role =>role._id)
       
    }else{
        const role = await Role.findOne({name:"client"})
        newUser.roles = [role._id]
    }

   const savedUser= await newUser.save();
   console.log(savedUser)
  
   res.status(200).json({message: "user created"})
}

export const  updateUser = async (req, res)=>{   
    const {userId} = req.params;
    const updateUser= req.body;

    const updatedUser= await User.findByIdAndUpdate(userId,updateUser,{
        new:true
    });
    res.status(200).json(updatedUser);
}

export const  deleteUser = async (req, res)=>{   
    try {
        const {userId} = req.params;
        await User.findByIdAndRemove(userId);
         res.status(204).json({message: "User deleted"});  
    }catch (error) {
        return res.status(400).json({error:error})
    }
    
    }