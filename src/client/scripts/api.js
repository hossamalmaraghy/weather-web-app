import axios from "axios";

// Fetch location data by making an API request to the server
export const fetchLocationData = async (city) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCity", { city }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching location:", error.message);
    throw new Error("Error fetching location data");
  }
};

// Fetch weather data by making an API request to the server
export const fetchWeatherData = async (lng, lat, remainingDays) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getWeather", {
      lng,
      lat,
      remainingDays,
    });
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Error fetching weather data");
  }
};

// Fetch city image data by making an API request to the server
export const fetchCityPicture = async (city_name) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCityPic", {
      city_name,
    });
    return data.image;
  } catch (error) {
    console.error("Error fetching city image:", error.message);
    return "https://source.unsplash.com/random/640x480?city"; // Default image in case of error
  }
};
