
import express from "express";
import { authUser } from '../middelware/auth.js';
import { query } from "express-validator";
import getCoordinates from "../controllers/Mapcontroller.js";
import getDistanceAndTime from "../controllers/DistanceController.js";
import getAutoCompleteSuggestions from "../controllers/suggestionsControllres.js";

const MapRouter = express.Router();

// Route 1: Get coordinates from an address (using Nominatim)
MapRouter.get(
    "/get-coordinates",
    [
        authUser,  // Authentication Middleware
        query("address")
            .isString()
            .trim()
            .isLength({ min: 3 })
            .withMessage("Address must be at least 3 characters long")
    ],
    getCoordinates
);

// Route 2: Get distance & time between two coordinates (using OSRM)
MapRouter.get(
    "/get-distance",
    [
        authUser, 
        query("origin").isString().trim().isLength({ min: 3 }).withMessage("Origin must be a valid address"),
        query("destination").isString().trim().isLength({ min: 3 }).withMessage("Destination must be a valid address")
    ],
    getDistanceAndTime
);
// suggestion route
MapRouter.get(
    "/autocomplete",
    [
        authUser,
        query("query")
            .isString()
            .trim()
            .isLength({ min: 2 })
            .withMessage("Query must be at least 2 characters long")
    ],
    getAutoCompleteSuggestions
);



export default MapRouter;