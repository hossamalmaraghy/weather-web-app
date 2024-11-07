// Calculate days remaining until the trip
export const getRdays = (date) => {
    const startDate = new Date();
    const endDate = new Date(date);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(`Calculated days remaining: ${daysDiff}`);
    return daysDiff < 0 ? 0 : daysDiff;
  };
  
  // Validate user inputs for the city and date fields
  export const validate_inputs = (cityInp, dateInp, city_error, date_error) => {
    city_error.style.display = "none";
    date_error.style.display = "none";
  
    if (!cityInp.value) {
      city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>City is required`;
      city_error.style.display = "block";
      console.log("City input is missing.");
      return false;
    }
  
    if (!dateInp.value) {
      date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
      date_error.style.display = "block";
      console.log("Date input is missing.");
      return false;
    }
  
    if (getRdays(dateInp.value) < 0) {
      date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Date cannot be in the past`;
      date_error.style.display = "block";
      console.log("Date entered is in the past.");
      return false;
    }
  
    console.log("Validation successful");
    return true;
  };
  
  // Update the UI with weather, image, and city details
  export const updateUI = (Rdays, city, pic, weather) => {
    console.log("Updating UI with fetched data...");
    document.querySelector("#Rdays").innerHTML = `Your trip starts in ${Rdays} days`;
    document.querySelector(".cityName").innerHTML = `Location: ${city}`;
  
    document.querySelector(".weather").innerHTML =
      Rdays > 7
        ? `Weather forecast: ${weather.description}`
        : `Current weather: ${weather.description}`;
  
    document.querySelector(".temp").innerHTML =
      Rdays > 7
        ? `Forecasted Temperature: ${weather.temp}&degC`
        : `Temperature: ${weather.temp}°C`;
  
    document.querySelector(".max-temp").innerHTML =
      Rdays > 7 ? `Max Temp: ${weather.app_max_temp}°C` : "";
    document.querySelector(".min-temp").innerHTML =
      Rdays > 7 ? `Min Temp: ${weather.app_min_temp}°C` : "";
  
    document.querySelector(".cityPic").innerHTML = `<img src="${pic}" alt="City Image" />`;
    document.querySelector(".flight_data").style.display = "block";
  };
  