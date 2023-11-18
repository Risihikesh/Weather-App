import { useDispatch, useSelector } from 'react-redux';
import { changeIndex, getForecast } from '../../features/weatherSlice';
import './Slider.css';
import WeatherIcon from './WeatherIcon';
import React, { useState } from 'react';
import arrow from '../../svg/arrow.svg';

export default function Slider() {
  const forecasts = useSelector(getForecast);
  const dispatch = useDispatch();
  const [getX, setX] = useState(0);

  const translateV = 250;

  const buttonStyle = {
    backgroundImage: `url(${arrow})`,
  };

  return (
    <div className="SliderWrapper">
      <button
        className="SliderButtonLeft"
        onClick={() => {
          if (getX < 0) setX(getX + translateV);
        }}
        style={{ ...buttonStyle }}
        alt={'Arrow button'}
      />
      <ul
        className="Slider"
        style={{ transform: `translateX(${getX}px)`, transition: 'transform 0.3s ease-in-out' }}
      >
        {React.Children.toArray(
          forecasts.list.map((forecast, id) => (
            <li
              onClick={() => {
                dispatch(changeIndex(id));
              }}
            >
              <WeatherIcon weather={forecast} key={id} />
            </li>
          )),
        )}
      </ul>
      <button
        className="SliderButtonRight"
        onClick={() => {
          if (getX > -3500) setX(getX - translateV);
        }}
        style={{ ...buttonStyle }}
        alt={'Arrow button'}
      />
    </div>
  );
}
