import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type={'text'}
            value={username}
            onChange={handleUsernameChange}/>
        </div>
        <div>
          password
          <input
            type={'text'}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm