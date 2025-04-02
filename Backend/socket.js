// // socket.js
// import { Server } from "socket.io";
// import userModel from "./modelsf/userModels.js";
// import captainModel from "./modelsf/captainmodels.js";

// let io;

// // Function to initialize Socket.IO
// export const initializeSocket = (server) => {
//     io = new Server(server, {
//         cors: {
//             origin: "*", // Allow requests from any origin
//             methods: ["GET", "POST"]
//         }
//     });

//     io.on("connection", (socket) => {
//         console.log(`User connected: ${socket.id}`);
//         socket.on('join',async(data)=>{
//             const{userId,userType}=data;
//             if(userType==='user'){
//                 await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
//             }
//             else if(userType==='captain'){
//                 await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
//             }
//         });

//         socket.on("disconnect", () => {
//             console.log(`User disconnected: ${socket.id}`);
//         });
//     });
// };

// // Function to send message to a specific socket ID
// export const sendMessage = (socketId, message) => {
//     if (io) {
//         io.to(socketId).emit("message", message);
//     }
// };

// socket.js
import { Server } from "socket.io";
import userModel from "./modelsf/userModels.js";
import captainModel from "./modelsf/captainmodels.js";
// import captainModel from "../modelsf/captainmodels.js";

let io;

// Function to initialize Socket.IO
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow requests from any origin
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle user joining
        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;

                console.log(userId,userType)

                if (!userId || !userType) {
                    console.error("Invalid data received in 'join' event", data);
                    return;
                }

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
                
                console.log(`${userType} with ID ${userId} joined with socket ID ${socket.id}`);
            } catch (error) {
                console.error("Error updating socketId in database:", error);
            }
        });
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || typeof location !== 'object' || !location.ltd || !location.lng) {
                console.error("Invalid location data received in 'update-location-captain' event", data);
                return;
            }
            console.log(`User ${userId} updated Location to ${location.ltd} ${location.lng}`);
          
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [parseFloat(location.lng), parseFloat(location.ltd)]
                }
            });
        });

        // Handle disconnection
        socket.on("disconnect", async () => {
            console.log(`Client disconnected: ${socket.id}`);

            try {
                await userModel.updateOne({ socketId: socket.id }, { $unset: { socketId: 1 } });
                await captainModel.updateOne({ socketId: socket.id }, { $unset: { socketId: 1 } });
            } catch (error) {
                console.error("Error clearing socketId on disconnect:", error);
            }
        });
    });
};

// Function to send message to a specific socket ID
export const sendMessage = (socketId, messageObject) => {
    console.log(`sending message to sockeTid ${socketId} `,messageObject)
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error("Socket.IO is not initialized");
    }
};
