
import axios from "axios";
import captainModel from "../modelsf/captainmodels.js";

const getAddressesCoordinates = async (address) => {
    console.log("Fetching coordinates for:", address);
    
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "YourAppName (your@email.com)", // Required by Nominatim
            }
        });

        // console.log("Nominatim Response:", response.data);

        if (response.data.length === 0) {
            return { error: "Address not found" };
        }

        const location = response.data[0];
        return {
            ltd: parseFloat(location.lat),
            lng: parseFloat(location.lon),
            display_name: location.display_name,
        };

    } catch (error) {
        console.error("Error fetching data from Nominatim:", error);
        return { error: error.message };
    }
};
const getCaptainInTheRadius = async (ltd, lng, radius) => {
    try {
        console.log("Searching Captains near:", { ltd, lng, radius });

        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(lng), parseFloat(ltd)], radius / 6371] // Convert to radians
                }
            }
        });

        console.log("Captains Found:", captains);
        return captains;
    } catch (error) {
        console.error("Error finding captains in radius:", error);
        return [];
    }
};

export  {getCaptainInTheRadius};

export default getAddressesCoordinates;

