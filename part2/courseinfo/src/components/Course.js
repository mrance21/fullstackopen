  const Header = ({ course }) => <h1>{course.name}</h1>
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </>
    )
  }
    
  const Total = ({ sum }) => <p>Total of {sum} exercises</p>

  const Course = ({courses}) => {
    return (
      <>
        <Header course={courses[0]}/>
        <Content parts={courses[0].parts}/>
        <Total sum={courses[0].parts.reduce((sum, part) => {
          return sum + part.exercises
        }, 0)} />
        <Header course={courses[1]}/>
        <Content parts={courses[1].parts}/>
        <Total sum={courses[1].parts.reduce((sum, part) => {
          return sum + part.exercises
        }, 0)} />
      </>
    )
  }
  
  export default Course