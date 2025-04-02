import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io("http://localhost:4000");

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (eventName, message) => {
        // console.log(`sendingMessage :${message} to ${eventName}`)
        socket.emit(eventName, message);
    };

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback);
    };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage,socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
