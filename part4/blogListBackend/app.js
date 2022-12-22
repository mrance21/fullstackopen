const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', true)
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected to Mongo DB')
    })
    .catch(() => {
        logger.info("couldn't connect to Mongo DB")
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/bloglist', blogRouter)

module.exports = app