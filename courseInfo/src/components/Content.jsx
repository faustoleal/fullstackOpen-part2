import Part from "./Part";

const Content = ({ parts }) => {
  const total = parts.map((a) => a.exercises);
  const reduce = total.reduce((a, b) => a + b);
  //console.log(reduce);
  //console.log(total);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <b>total of {reduce} exercises</b>
    </>
  );
};

export default Content;
