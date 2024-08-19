import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/County";
import "./index.css";

function App() {
  const [value, setValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [dataCountry, setDataCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [show, setShow] = useState(false);

  const api_key = import.meta.env.VITE_SOME_KEY;

  //console.log(api_key);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then((res) => {
          setDataCountry(res.data);
        });
    }
  }, [country]);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        )
        .then((res) => {
          setWeatherInfo(res.data);
        });
    }
  }, [city]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        //console.log(res.data);
        setAllCountries(res.data);
      });
  }, []);

  const handleChange = (e) => {
    //console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleClick = (info) => {
    //console.log(info);
    setCountry(info.name.common);
    setCity(info.capital.toString());
    setShow(true);
  };

  //console.log(dataCountry);
  //console.log(city);

  const filter = allCountries.filter((el) => el.name.common.includes(value));
  //console.log(filter);

  //console.log(value);

  return (
    <>
      <p>
        find countries <input value={value} onChange={handleChange} />
      </p>
      {filter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <div>
          {filter.map((el) => (
            <Countries key={el.area} data={el} handleClick={handleClick} />
          ))}
        </div>
      )}
      <div className={show ? "show" : "none"}>
        {dataCountry !== null ? (
          <Country data={dataCountry} dataWeather={weatherInfo} />
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default App;
