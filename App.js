const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//module internal imports
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')
const testingRouter = require("./controllers/testing")


const url = config.MONGODB_URI

logger.info('connecting to', url)

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log('connected to MongoDB');

    app.use(cors())
    app.use(express.json())

    // Middleware
    app.use(middleware.requestLogger)
    app.use(middleware.tokenExtractor)
    
    // Routes
    // this is related to 4.22. --> 
    // app.use("/api/blogs", middleware.userExtractor, blogsRouter)
    app.use('/api/blogs', blogsRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/login', loginRouter)

    if (process.env.NODE_ENV === 'test') {
      const testingRouter = require('./controllers/testing')
      app.use('/api/testing', testingRouter)
    }
    
    // More middleware
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

  } catch (error) {
    console.log('error connecting to MongoDB:', error.message)
  }
  return app;
};
    

module.exports = connect