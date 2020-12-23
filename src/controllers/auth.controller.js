import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

//REGISTER NEW USER 
export const register = async (req, res)=>{ 
try {
    const {username, email, password,name,phone,  address, roles} = req.body;

    const newUser = new User({
       username,
       name,
       phone,
       address,
       email,
         password: await User.encryptPassword(password)
     });
    //if you don't send roles: []
     //register roles from body 
     if(roles){
         const foundRoles = await Role.find({name:{$in: roles}})
         newUser.roles= foundRoles.map(role =>role._id)
     
         //set role "client" by defect
     }else{
         const role = await Role.findOne({name:"client"})
         newUser.roles = [role._id]
     }
   
    const savedUser= await newUser.save();
    console.log(savedUser)
   
    const token= jwt.sign({id:savedUser._id}, config.SECRET, {
        expiresIn:86400 //seg 24 hrs
    })
   
     res.status(200).json({token}) 
} catch (error) {
    res.status(400).json(error.message)
}
}

//LOGIN
export const  login = async (req, res)=>{ 
    const {email,password} = req.body
    const userFound = await User.findOne({email:email}).populate("roles");
    if(!userFound) return res.status(400).json({token:null, message: "ERROR User not found"});
    const matchPassword = await User.comparePassword(password, userFound.password);

    if(!matchPassword) return res.status(401).json({token:null, message:"ERROR invalid password"})
 
    const token= jwt.sign({id:userFound._id, username:userFound.username}, config.SECRET, {
        expiresIn:86400 //seg 24 hrs
    })
    res.json({token})
}