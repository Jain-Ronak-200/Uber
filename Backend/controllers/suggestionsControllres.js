import axios from "axios";
import { validationResult } from "express-validator";

const getAutoCompleteSuggestions = async (req, res) => {
    // console.log("Received request query:", req.query);

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ error: errors.array() });
    }

    const { query } = req.query;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;

    try {
        const response = await axios.get(url);
        const suggestions = response.data.map((place) => ({
            name: place.display_name,
            lat: place.lat,
            lng: place.lon
        }));

        return res.json({
            success: true,
            suggestions
        });
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export default getAutoCompleteSuggestions;
