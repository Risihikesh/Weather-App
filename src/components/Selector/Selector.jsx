import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCity,
  fetchCurrentWeather,
  fetchForecastWeather,
  getChosenCity,
} from '../../features/weatherSlice';
import Button from '../Button/Button';
import './Selector.css';

function Option({ id, name, country, state, lat, lon }) {
  const dispatch = useDispatch();

  const chosenCity = useSelector(getChosenCity);

  const [wrapperStyle, setWrapperStyle] = useState('OptionWrapper');

  function setWrapperStyleF(name) {
    if (wrapperStyle !== name) {
      setWrapperStyle(name);
    }
  }

  chosenCity.id === id
    ? setWrapperStyleF('ChosenOptionWrapper')
    : setWrapperStyleF('OptionWrapper');

  return (
    <>
      <div className={wrapperStyle}>
        <h4>City name: {name}</h4>
        <h5>Country: {country}</h5>
        <h5>State: {state}</h5>
        <Button
          onClick={() => {
            dispatch(
              addCity({
                id,
                name,
                country,
                state,
                lat,
                lon,
              }),
            );
            dispatch(
              fetchCurrentWeather({
                lat,
                lon,
              }),
            );
            dispatch(
              fetchForecastWeather({
                lat,
                lon,
              }),
            );
          }}
        >
          Select
        </Button>
      </div>
    </>
  );
}

export default function Selector({ cityData }) {
  return (
    <div className="SelectorWrapper">
      {cityData.map((data) => (
        <Option
          id={data.id}
          name={data.name}
          country={data.country}
          state={data.state}
          lat={data.lat}
          lon={data.lon}
          key={data.id}
        />
      ))}
    </div>
  );
}
