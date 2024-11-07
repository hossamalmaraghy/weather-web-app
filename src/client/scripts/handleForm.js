import { fetchLocationData, fetchWeatherData, fetchCityPicture } from "./api";
import { getRdays, validate_inputs, updateUI } from "./utils";

// Selecting the form elements for the input fields
const form = document.querySelector("form");
const cityInp = document.querySelector("#city");
const dateInp = document.querySelector("#trip-date");

// Selecting elements for displaying validation errors  
const city_error = document.querySelector("#city-error");
const date_error = document.querySelector("#date-error");

// Main function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  console.log("Form submission initiated...");

  // Step 1: Validate form inputs before proceeding with API calls
  if (!validate_inputs(cityInp, dateInp, city_error, date_error)) {
    console.log("Form validation failed. Ensure all inputs are correct.");
    return;
  }

  // Store input data in local storage for persistence across sessions
  localStorage.setItem("travelCity", cityInp.value);
  localStorage.setItem("travelDate", dateInp.value);
  console.log(`Stored city: ${cityInp.value} and date: ${dateInp.value} in local storage.`);

  try {
    // Step 2: Fetch the location details based on the city input
    console.log(`Attempting to fetch location data for city: ${cityInp.value}`);
    const Location = await fetchLocationData(cityInp.value);
    
    if (Location && Location.error) {
      city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${Location.message}`;
      city_error.style.display = "block";
      console.log("Location error:", Location.message);
      return;
    } else if (Location) {
      const { lng, lat, name } = Location;
      const date = dateInp.value;

      if (!date) {
        date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
        date_error.style.display = "block";
        console.log("Date not provided by user.");
        return;
      }

      console.log(`Location fetched: ${name} with coordinates: ${lng}, ${lat}`);

      if (lng && lat) {
        // Step 3: Calculate days remaining until the trip date
        const remainingDays = getRdays(date);
        console.log(`Days until trip: ${remainingDays}`);
        
        // Step 4: Fetch the weather data for the specified location and date range
        console.log(`Fetching weather data for coordinates: ${lng}, ${lat} and remaining days: ${remainingDays}`);
        const weather = await fetchWeatherData(lng, lat, remainingDays);

        if (weather && weather.error) {
          date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${weather.message}`;
          date_error.style.display = "block";
          console.log("Weather error:", weather.message);
          return;
        }

        console.log(`Weather data received: ${JSON.stringify(weather)}`);

        // Step 5: Fetch the city image to enhance user interface
        console.log(`Fetching image for city: ${name}`);
        const pic = await fetchCityPicture(name);
        updateUI(remainingDays, name, pic, weather);
      }
    }
  } catch (error) {
    console.error("An error occurred during form submission:", error.message);
  }
};

export { handleSubmit };
