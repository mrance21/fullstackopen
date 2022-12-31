const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', true)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Mongo DB')
  })
  .catch(() => {
    logger.info('couldn\'t connect to Mongo DB')
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


/* Telling the app to use the blogRouter when the url is /bloglist */
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app