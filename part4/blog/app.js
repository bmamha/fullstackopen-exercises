const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


logger.info("Connecting to database", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then( () => {
    logger.info('Connected to MongoDB')
})
.catch( (error) => {
    logger.error("error connecting to MongoDB", error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

module.exports = app