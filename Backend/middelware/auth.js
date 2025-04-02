import BlacklistToken from "../modelsf/blacklisttokenmodels.js";
import captainModel from "../modelsf/captainmodels.js";
import userModel from "../modelsf/userModels.js";
import jwt from 'jsonwebtoken';

const authUser = async(req,res,next)=>{
    
    try {
        const token =req.cookies.token||req.headers.authorization?.split(' ')[1];
        
        if(!token){
            return res.json({success:false,message:"unauthorized user"})
        }
        // const isBlackListed = await userModel.findOne({token:token})
        const isBlackListed = await BlacklistToken.findOne({token:token})
        if(isBlackListed){
            // console.log(token)
            return res.json({success:false,message:"unauthorized user"})
        }
        if(token){
            const tokendecode = jwt.verify(token,process.env.jwt_SECRET)
            const user = await userModel.findById(tokendecode.id)
            // console.log(tokendecode)
            // console.log(tokendecode._id)

            // console.log(user)
            req.user=user;
            return next()
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
        
    }

}
const captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log(token);

        if (!token) {
            return res.json({ success: false, message: "unauthorized user" });
        }

        const isBlackListed = await BlacklistToken.findOne({ token: token });
        if (isBlackListed) {
            return res.json({ success: false, message: "unauthorized user" });
        }

        if (token) {
            const tokendecode = jwt.verify(token, process.env.jwt_SECRET);
            const user = await captainModel.findById(tokendecode.id);



            req.user = user;
            return next();
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message})
    }
}
export{authUser,captainAuth}