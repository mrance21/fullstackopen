import React from 'react'

const Header = ({course}) => {
  // header takes care of rendering the name
  return <h1>Course Name: {course.name}</h1>
}


const Content = ({parts}) => {
  // content renders parts and their number of exercises
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} /> 
      <Part part={parts[2].name} exercises={parts[2].exercises} /> 
    </>
  )
}

const Part = ({part, exercises}) => {
  return (
    <>
      <p>{part} {exercises}</p>
    </>
  )
}

const Total = ({parts}) => {
  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App