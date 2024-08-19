import Weather from "../../../courseInfo/src/components/Weather";

const Country = ({ data, dataWeather }) => {
  let arr = Object.entries(data.languages);

  //console.log(data);
  //console.log(dataWeather);

  return (
    <>
      <h1>{data.name.common}</h1>
      <p>capital {data.capital}</p>
      <p>area {data.area}</p>
      <h4>languages:</h4>
      <ul>
        {arr.map((el, i) => (
          <li key={i}>{el[1]}</li>
        ))}
      </ul>
      <img src={data.flags.png} alt={data.flags.alt} />
      <h2>{`Weather in ${data.capital}`}</h2>
      {dataWeather !== null ? <Weather data={dataWeather} /> : <div></div>}
    </>
  );
};

export default Country;
