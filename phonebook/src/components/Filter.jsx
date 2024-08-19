const Filter = ({ filters, handleFilter }) => {
  return (
    <p>
      filter shown with <input value={filters} onChange={handleFilter} />
    </p>
  );
};

export default Filter;
