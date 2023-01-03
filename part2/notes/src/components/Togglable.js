import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    /* A component that renders a button and a div. The div is hidden by default and is shown when the
    button is clicked. */
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )



}



export default Togglable