import { useState } from "react"
// const Header = (props) => {
//   // header takes care of rendering the name
//   return <h1>Course Name: {props.course.name}</h1>
// }


// const Content = (props) => {
//   // content renders parts and their number of exercises
//   return (
//     <>
//       <Part part={props.course.parts[0].name} exercises={props.course.parts[1].exercises} />
//       <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} /> 
//       <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} /> 
//     </>
//   )
// }

// const Part = (props) => {
//   return (
//     <>
//       <p>{props.part} {props.exercises}</p>
//     </>
//   )
// }

// const Total = (props) => {
//   return (
//     <>
//       <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
//     </>
//   )
// }

// const Display = ({counter}) => <>{counter}</>

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={setToZero} text="zero"/>
//       <Button onClick={decreaseByOne} text="minus"/>
//     </div>
//   )
// }

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })


//   const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1})
  

//   const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//         <div>the app is used by pressing the buttons</div>
//       )
//   }
//   return (
//     <div>button press history: {props.allClicks.join(", ")}</div>
//   )
// }

// const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text={'left'}></Button>
//       <Button handleClick={handleRightClick} text={'right'}></Button>
//       {right}
//       <History allClicks={allClicks}/>
//     </div>
//   )
// }

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default App
