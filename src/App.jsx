import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, getCities, getGeoStatus } from './features/geocodingSlice';
import {
  getChosenCity,
  getCurrentStatus,
  getForecast,
  getForecastStatus,
  getIndex,
} from './features/weatherSlice';
import Selector from './components/Selector/Selector';
import Input from './components/Input/Input';
import './App.css';
import { useEffect, useState } from 'react';
import Slider from './components/Slider/Slider';
import WeatherIcon from './components/Slider/WeatherIcon';

function App() {
  const dispatch = useDispatch();

  const geoAPI = useSelector(getCities);
  const chosenCity = useSelector(getChosenCity);
  const forecasts = useSelector(getForecast);
  const getI = useSelector(getIndex);

  const getStatus = useSelector(getGeoStatus);
  const currentWeatherStatus = useSelector(getCurrentStatus);
  const forecastStatus = useSelector(getForecastStatus);

  const [cityInput, setCityInput] = useState('');

  const [backgroudStyles, setBackgroundStyles] = useState('Default');

  useEffect(() => {
    if (forecasts.length !== 0) {
      console.log(forecasts.list[getI].weather[0].icon);
      switch (forecasts.list[getI].weather[0].icon) {
        case '01d':
          setBackgroundStyles('DayBackground');
          break;
        case '01n':
          setBackgroundStyles('NightBackground');
          break;
        case '02d':
        case '03d':
        case '04d':
          setBackgroundStyles('CloudyDay');
          break;
        case '02n':
        case '03n':
        case '04n':
          setBackgroundStyles('CloudyNight');
          break;
        case '09d':
        case '10d':
        case '11d':
          setBackgroundStyles('RainyDay');
          break;
        case '09n':
        case '10n':
        case '11n':
          setBackgroundStyles('RainyNight');
          break;
        default:
          setBackgroundStyles('Default');
          break;
      }
    }
  }, [getI, forecastStatus, forecasts.list, forecasts.length]);

  return (
    <>
      <header className="PrimaryHeader">
        <div className="AppWrapper">
          <h1 className="Header">Weather App</h1>
          <Input
            value={cityInput}
            placeholder="City Name"
            setCityInput={setCityInput}
            func={(e) => {
              e.preventDefault();
              dispatch(fetchCities(cityInput));
              setCityInput('');
            }}
          />
        </div>
      </header>
      <section className="AppWrapper">
        <div className={backgroudStyles} />
        <div className="Wrapper">
          <div style={{ margin: '5px' }}>
            {getStatus === 'succeeded' && <Selector cityData={geoAPI} />}
          </div>
          {forecastStatus === 'succeeded' &&
            currentWeatherStatus === 'succeeded' &&
            (getI === -1 || !getI ? (
              <div className="WeatherWrapper">
                <h2>{chosenCity.name}</h2>
                <div>
                  <WeatherIcon weather={forecasts.list[getI]} selected />
                </div>
                <div>
                  <h3>Temperature forecast</h3>
                  <Slider />
                </div>
              </div>
            ) : (
              <div className="WeatherWrapper">
                <h2>{chosenCity.name}</h2>
                <div>
                  <WeatherIcon weather={forecasts.list[getI]} selected />
                </div>
                <div>
                  <h3>Temperature forecast</h3>
                  <Slider />
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
