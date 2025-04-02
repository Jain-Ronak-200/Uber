import axios from "axios";
import { validationResult } from "express-validator";

// Function to convert address to coordinates
// const getCoordinatesFromAddress = async (address) => {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
//     try {
//         const response = await axios.get(url);
//         if (response.data.length === 0) {
//             return null; // Address not found
//         }
//         const location = response.data[0];
//         return { lat: location.lat, lng: location.lon };
//     } catch (error) {
//         console.error("Error fetching coordinates:", error);
//         return null;
//     }
// };

// Controller for getting distance & time
// const getDistanceAndTime = async (req, res) => {
//     console.log("Received request query:", req.query);
    
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log("Validation errors:", errors.array());
//         return res.status(400).json({ error: errors.array() });
//     }
    
//     const { origin, destination } = req.query;
    
//     // Convert origin & destination to coordinates
//     const originCoords = await getCoordinatesFromAddress(origin);
//     const destinationCoords = await getCoordinatesFromAddress(destination);
    
//     if (!originCoords || !destinationCoords) {
//         return res.status(400).json({ error: "Invalid origin or destination address." });
//     }
    
//     // Construct OSRM URL for distance calculation
//     const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;
    
//     try {
//         const response = await axios.get(osrmUrl);
//         const data = response.data.routes[0];
        
//         return res.json({
//             success: true,
//             origin: { address: origin, lat: originCoords.lat, lng: originCoords.lng },
//             destination: { address: destination, lat: destinationCoords.lat, lng: destinationCoords.lng },
//             distance_km: (data.distance / 1000).toFixed(2), // Convert meters to km
//             duration_min: (data.duration / 60).toFixed(2),  // Convert seconds to minutes
//         });
//     } catch (error) {
//         console.error("Error fetching distance & time:", error);
//         return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// export default getDistanceAndTime;




// Function to convert address to coordinates
const getCoordinatesFromAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            return null; // Address not found
        }
        const location = response.data[0];
        return { lat: location.lat, lng: location.lon };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};

// Modify function to accept parameters instead of `req.query`
const getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required.");
    }

    // Convert origin & destination to coordinates
    const originCoords = await getCoordinatesFromAddress(origin);
    const destinationCoords = await getCoordinatesFromAddress(destination);

    if (!originCoords || !destinationCoords) {
        throw new Error("Invalid origin or destination address.");
    }

    // Construct OSRM URL for distance calculation
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

    try {
        const response = await axios.get(osrmUrl);
        const data = response.data.routes[0];

        return {
            success: true,
            distance_km: (data.distance / 1000).toFixed(2), // Convert meters to km
            duration_min: (data.duration / 60).toFixed(2),  // Convert seconds to minutes
        };
    } catch (error) {
        console.error("Error fetching distance & time:", error);
        throw new Error("Failed to fetch distance and time.");
    }
};

export default getDistanceAndTime;















































































// import axios from "axios";
// import { validationResult } from "express-validator";

// const getDistanceAndTime = async (req, res) => {
//     console.log("Received request query:", req.query);

//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log("Validation errors:", errors.array());
//         return res.status(400).json({ error: errors.array() });
//     }

//     const { startLat, startLng, endLat, endLng } = req.query;

//     if (!startLat || !startLng || !endLat || !endLng) {
//         return res.status(400).json({ error: "Missing required query parameters" });
//     }

//     const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=false`;

//     try {
//         const response = await axios.get(url);
//         const data = response.data.routes[0];

//         return res.json({
//             success: true,
//             distance_km: (data.distance / 1000).toFixed(2), // Convert meters to km
//             duration_min: (data.duration / 60).toFixed(2),  // Convert seconds to minutes
//         });
//     } catch (error) {
//         console.error("Error fetching distance & time:", error);
//         return res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// export default getDistanceAndTime;