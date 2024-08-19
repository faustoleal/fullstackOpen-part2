import { useState, useEffect } from "react";
import Name from "./components/Name";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/person";
import Notification from "./components/Notification";
import "../src/index.css";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filters, setFilters] = useState("");
  const [errorMessage, setErrorMesagge] = useState(null);
  const [message, setMesagge] = useState(null);

  //part 2 exercise 2.11

  useEffect(() => {
    //console.log("effect");
    /*   axios.get("http://localhost:3001/persons").then((res) => {
      console.log(res.data);
      setPersons(res.data);
    }); */
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        console.log("fail", err);
        setErrorMesagge("some error happend...");
        setTimeout(() => {
          setErrorMesagge(null);
        }, 5000);
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };

    const found = persons.find((el) => el.name === newName);

    if (
      persons.find((p) => p.name === newName) &&
      persons.find((p) => p.number === newNumber)
    ) {
      alert(`${newName} and ${newNumber} is already added to phonebook`);
    } else if (
      persons.find((p) => p.name === newName) &&
      persons.find((p) => p.number !== newNumber)
    ) {
      alert(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );
      personService
        .update(found.id, nameObject)
        .then((returnPerson) => {
          setPersons(
            persons.map((p) => (p.id !== found.id ? p : returnPerson))
          );
          setMesagge(`Update ${returnPerson.name}`);
          setTimeout(() => {
            setMesagge(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(
            `${nameObject.name} was already deletes from server`,
            err
          );
          setErrorMesagge(
            `Information of ${nameObject.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMesagge(null);
          }, 5000);
        });
    } else {
      //setPersons([...persons, nameObject]);
      personService
        .create(nameObject)
        .then((returnPerson) => {
          setPersons([...persons, returnPerson]);
          setMesagge(`Added ${returnPerson.name}`);
          setTimeout(() => {
            setMesagge(null);
          }, 5000);
          //console.log(res.data);
        })
        .catch((err) => {
          console.log("fail", err);
          setErrorMesagge("some error happend...");
          setTimeout(() => {
            setErrorMesagge(null);
          }, 5000);
        });
    }

    //setPersons([...persons, nameObject]);
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    //console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilters(e.target.value);
  };

  const deletePerson = (id) => {
    //console.log(id);
    personService
      .deleteElement(id)
      .then((returnPerson) => {
        console.log(returnPerson);
        alert(`Delete ${returnPerson.name} ?`);
        setPersons(persons.filter((el) => el.id !== id));
        setMesagge(`Delete ${returnPerson.name}`);
        setTimeout(() => {
          setMesagge(null);
        }, 5000);
      })
      .catch((err) => {
        console.log("fail");
      });
  };

  const filter = persons.filter(
    (el) =>
      el.name.toLowerCase().includes(filters.toLowerCase()) ||
      el.number.includes(filters)
  );

  //console.log(filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Message message={message} />
      <Filter filters={filters} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {filter.map((person) => (
        <Name
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
