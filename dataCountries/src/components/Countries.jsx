const Countries = ({ data, handleClick }) => {
  return (
    <p>
      {data.name.common} <button onClick={() => handleClick(data)}>show</button>
    </p>
  );
};

export default Countries;
