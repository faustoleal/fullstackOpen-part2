const Name = ({ person, deletePerson }) => {
  //console.log(person);
  return (
    <>
      <p>
        {`${person.name} ${person.number}`}{" "}
        <button onClick={deletePerson}>delete</button>
      </p>
    </>
  );
};

export default Name;
