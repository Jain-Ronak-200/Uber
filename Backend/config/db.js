import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>console.log("CONNECTED DB"))
    await mongoose.connect(`${process.env.MONGODB}/Uber`)
}
export default connectDB