import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

//REGISTER NEW USER 
export const register = async (req, res)=>{ 
  const {username, email, password,roles} = req.body;

 const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
  });

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



//CREATE TOKEN
 const token= jwt.sign({id:savedUser._id}, config.SECRET, {
     expiresIn:86400 //seg 24 hrs
 })

  res.status(200).json({token})
}
