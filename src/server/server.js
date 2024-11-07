const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.static('dist'));

dotenv.config();


const  {fetchLocationData} = require("./cityLocation.js");
const {retrieveWeatherInfo} = require("./retrieveTemp.js");
const {fetchImageForDestination} = require("./cityPicture.js");


app.use(cors());

port = 9003

const API_USER_NAME = process.env.API_USER_NAME;
const API_USER_ID = process.env.API_USER_ID;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PIXABAY_API_TOKEN = process.env.PIXABAY_API_TOKEN;
const USERNAME = API_USER_NAME.concat(API_USER_ID);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.post("/getCity", async (req,res) => {
    const city = req.body.city;
    const Location= await fetchLocationData(city, USERNAME)

    return res.send(Location)
})

app.post("/getWeather", async (req,res) => {
   const {lng, lat, remainingDays} = req.body
   const getWeather = await retrieveWeatherInfo(lng, lat, remainingDays, WEATHER_API_KEY)
   return res.send(getWeather)
})

app.post("/getCityPic", async (req,res) => {
  const {city_name} = req.body
  const getPic = await fetchImageForDestination(city_name, PIXABAY_API_TOKEN)
  return res.send(getPic)
})

app.listen(8000, () => console.log(`server is listening on port ${port}`))