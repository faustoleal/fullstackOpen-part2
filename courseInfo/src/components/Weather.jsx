const Weather = ({ data }) => {
  //console.log(data);
  return (
    <>
      <p>{`temperature ${data.main.temp} Celcius`}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={`${data.weather[0].icon}`}
      />
      <p>{`Wind ${data.wind.speed} m/s`}</p>
    </>
  );
};

export default Weather;
