import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/db.js";
import userRouter from "./Routers/userRouter.js";
import cookieParser from "cookie-parser";
import captainRouter from "./Routers/captainRoutes.js";
import MapRouter from "./Routers/Mapsroutes.js";
import riderouter from "./Routers/RideRoutes.js";
import { initializeSocket } from "./socket.js";//
import { createServer } from "http"; //



const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())
connectDB();

app.get('/',(req,res)=>res.send("API WORKING..."));

// api end point
app.use('/api/user',userRouter)
app.use('/captain',captainRouter)
app.use('/maps',MapRouter)
app.use('/rides',riderouter)

const server = createServer(app);//
initializeSocket(server);//



// app.listen(PORT,()=>console.log(`SERVER STARTED ON http://localhost:${PORT}`))
server.listen(PORT, () => console.log(`SERVER STARTED ON http://localhost:${PORT}`));//
