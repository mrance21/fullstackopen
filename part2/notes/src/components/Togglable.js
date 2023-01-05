import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

/* `forwardRef` is a function that is used to pass a ref to a component. */
const Togglable = forwardRef((props, refs) => {
/* A hook that is used to set the state of the component. */
  const [visible, setVisible] = useState(false)

  /* Setting the display property of the div to none if the value of visible is false. */
  const hideWhenVisible = { display: visible ? 'none' : '' }
  /* Setting the display property of the div to none if the value of visible is false. */
  const showWhenVisible = { display: visible ? '' : 'none' }


  /**
  * If the current value of visible is true, set it to false. If the current value of visible is false,
  * set it to true
  */
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /* A hook that is used to expose methods and properties of the component to the parent component. */
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

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
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable