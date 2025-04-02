import userModel from "../modelsf/userModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from 'validator'
import BlacklistToken from "../modelsf/blacklisttokenmodels.js";



 const registerUser = async(req,res)=>{
     try {
        const{fullname,email,password}=req.body;
        const exist = await userModel.findOne({email});

        if(exist){
            return res.json({success:false, message:"user already exist"});
        }
        if (!fullname||!email||!password) {
            return res.json({success:false,message:"missing details"})
            
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"please enter a valid email"});

        }
        if (password.length<8) {
            return res.json({success:false,message:"plz input 8 digit password"})
            
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.jwt_SECRET)
        res.json({success:true,token,user})
        // res.cookie('token',token);
 

        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})

        
    }
 }



 const loginUser = async(req,res)=>{

    const{email,password}=req.body;

    try {
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"please enter a valid email"});
    
        }
        if (password.length<8) {
            return res.json({success:false,message:"plz input 8 digit password"})
            
        }
        const user = await userModel.findOne({email}).select('+password');
    
        if(!user){
            return res.json({success:false,message:"invalid email or password"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET, { expiresIn: '24h' });

            return res.json({ success:true, token, user});
        }
        else{
            return res.json({success:false,message:'password is incorrect'})
        }
        


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }



 }
 const getUserProfile = async(req,res,next)=>{
    // console.log(req.user)
    return res.json(req.user)
 }


 const logoutUser = async(req,res)=>{
    res.clearCookie('token');
    try {
        
        const token = req.cookies.token||req.headers.authorization.split(' ')[1];
        await BlacklistToken.create({token});
        res.json({success:true,message:"user logged out"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    

 }



export{registerUser,loginUser,getUserProfile,logoutUser}