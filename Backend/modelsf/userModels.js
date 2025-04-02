import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{type:String,required:true,minlenght:[3,"first name must be 3 character"]},
        lastname:{type:String,minlenght:[3,"first name must be 3 character"]}
    },
    email:{type:String,required:true,unique:true, minlenght:[5,"email must be 5 character"]},
    password:{type:String,required:true, minlenght:[6,"password must be 5 character"]},
    socketId:{
        type:String
    }
   

})
const userModel= mongoose.models.user||mongoose.model("user",userSchema);
export default userModel