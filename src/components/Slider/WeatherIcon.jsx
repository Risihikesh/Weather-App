import './WeatherIcon.css';


export default function WeatherIcon({ weather, selected }) {
  const iconPath = `../../../src/assets/${weather.weather[0].icon}.svg`;
  return (
    <>
      {selected === true ? (
        <div className="SelectedWrapper">
          <div>{weather.main.temp + '°C'}</div>
          <img
            className="SelectedIcon"
            src={iconPath}
            alt={weather.weather[0].main}
          />
          <div>
            {weather.dt_txt.slice(0, 10) + ' '}
            {weather.dt_txt.slice(11, 19) + ' '}
          </div>
        </div>
      ) : (
        <div className="IconWrapper">
          <div className="Background">
            <div>{weather.main.temp + '°C'}</div>
            <img
              className="ArrowIcon"
              src={iconPath}
              alt={weather.weather[0].main}
            />
            <div>
              {weather.dt_txt.slice(0, 10) + ' '}
              {weather.dt_txt.slice(11, 19) + ' '}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
