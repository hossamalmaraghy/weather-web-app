const axios = require("axios");

// Fetches an image URL for the specified city
const fetchImageForDestination = async (city, key) => {
    try {
        const { data } = await axios.get(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo`);
        
        // Extract the image URL from the response or provide a default image
        const image = data.hits.length > 0 ? data.hits[0].webformatURL : "https://source.unsplash.com/random/640x480?city";
        
        console.log("Image URL fetched for city:", city);
        return { image };
    } catch (error) {
        console.log("Error fetching city image:", error.message);
        return { image: "https://source.unsplash.com/random/640x480?error" };
    }
};

module.exports = {
    fetchImageForDestination
};
