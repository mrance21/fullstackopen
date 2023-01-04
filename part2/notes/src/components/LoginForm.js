const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <>
    <h2>Login</h2>
    
      <form onSubmit={handleSubmit}>
        <div>
          username
            <input 
            type={"text"}
            value={username}
            onChange={handleUsernameChange}/>
        </div>
        <div>
          password
          <input 
          type={"text"}
          value={password}
          onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm