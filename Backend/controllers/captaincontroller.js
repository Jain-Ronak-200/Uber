import captainModel from "../modelsf/captainmodels.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { validationResult } from "express-validator";
import BlacklistToken from "../modelsf/blacklisttokenmodels.js";

const registerCaptain = async(req,res)=>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.json({success:false,message:error.array()})
        }
       const{fullname,email,password,vehicle}=req.body;
       const exist = await captainModel.findOne({email});

       if(exist){
           return res.json({success:false, message:"user already exist"});
       }
       if (!fullname||!email||!password||!vehicle.color||!vehicle.plate||!vehicle.capacity||!vehicle.type) {
           return res.json({success:false,message:"missing details"})
           
       }

       
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       const userData = {
           fullname:{
               firstname:fullname.firstname,
               lastname:fullname.lastname
           },
           email,
           password:hashedPassword,
           vehicle:{
                color:vehicle.color, 
                plate:vehicle.plate,
                capacity:vehicle.capacity,
                type:vehicle.type
           }

       }
       const newUser = new captainModel(userData)
       const captain = await newUser.save()

       const token = jwt.sign({id:captain._id},process.env.jwt_SECRET)
       res.json({success:true,token,captain})
       // res.cookie('token',token);


       
   } catch (error) {
       console.log(error)
       return res.json({success:false,message:error.message})

       
   }
}
const loginCaptain = async(req,res)=>{
    try {
        const error = validationResult(req)
        const{email,password}=req.body;
        const exist = await captainModel.findOne({email}).select('+password');
        if (!exist) {
            return res.json({success:false,message:"user not found"})
            
        }
        const isMatch = await bcrypt.compare(password,exist.password)
        if (!isMatch) {
            return res.json({success:false,message:"invalid password"})
            
        }
        const token = jwt.sign({id:exist._id},process.env.jwt_SECRET)
        res.cookie('token',token);
        res.json({success:true,token,user:exist})



    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
        
    }
}
const getCaptainProfile = async(req,res,next)=>{
    // console.log(req.user)
    return res.json(req.user)
 }
 const logoutCaptain = async(req,res)=>{
     try {
         
         const token = req.cookies.token||req.headers.authorization.split(' ')[1];
         await BlacklistToken.create({token});
         res.json({success:true,message:"user logged out"})
         res.clearCookie('token');
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    

 }


export {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain}