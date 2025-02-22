import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Forcast from "./components/forcast/Forcast";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const currentWeatherd = { city: "New York", temperature: 25 };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(",");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecaseResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.lable, ...forecaseResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);

  return (
    <>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        <Forcast data={forecast} />
      </div>
    </>
  );
}

export default App;
