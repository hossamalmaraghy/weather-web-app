const axios = require("axios");

// Function to retrieve the location details (longitude, latitude, etc.) based on city name
const fetchLocationData = async (city, username) => {
    try {
        // Make an API request to GeoNames to fetch city details
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`);
        
        // Check if the city exists in the response data
        if (!data.geonames || data.geonames.length === 0) {
            const errorResponse = {
                message: "City not found. Please check your spelling and try again.",
                error: true
            };
            console.log("City not found:", city);
            return errorResponse;
        }

        console.log("City location data fetched:", data.geonames[0].name);
        return data.geonames[0];
    } catch (error) {
        console.error("Error fetching city location data:", error.message);
        return {
            message: "Error retrieving city information. Please try again later.",
            error: true
        };
    }
};

module.exports = { fetchLocationData };
