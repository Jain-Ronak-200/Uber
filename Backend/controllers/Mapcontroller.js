import { validationResult } from "express-validator";
import getAddressesCoordinates from "../Services/mapsservices.js";
const getCoordinates = async (req, res) => {
    console.log("Received request query:", req.query); // Log incoming request data

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ error: errors.array() });
    }

    const { address } = req.query; // Ensure we're reading `address` from query

    try {
        const coordinates = await getAddressesCoordinates(address);
        // console.log("Fetched coordinates:", coordinates);

        if (coordinates.error) {
            return res.status(404).json({ success: false, error: coordinates.error });
        }

        res.json({ success: true, coordinates });

    } catch (error) {
        console.error("Error fetching coordinates:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
export default getCoordinates;