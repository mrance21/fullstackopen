const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log(username)

  /* Finding the user with the username that was given in the request body. */
  const user = await User.findOne({ username })
  console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    user: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    /* Setting the expiration time of the token to one hour. */
    { expiresIn: 60*60 }
  )

  /* Creating a token for the user. */
  // const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter