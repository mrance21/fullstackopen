const Header = (props) => {
  // header takes care of rendering the name
  return <h1>Course Name: {props.course}</h1>
}


const Content = (props) => {
  // content renders parts and their number of exercises
  return (
    <>
      <Part part={props.name} task={props.task1} />
      <Part part={props.name2} task={props.task2} />
      <Part part={props.name3} task={props.task3} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.task}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalExercises}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content name={part1} task1={exercises1} 
      name2={part2} task2={exercises2}
      name3={part3} task3={exercises3}/>
      <Total totalExercises={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
