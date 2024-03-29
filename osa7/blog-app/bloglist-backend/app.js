const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connection ok!')
  })
  .catch((error) => {
    logger.error('ERROR connecting', error.message)
  })

  console.log(process.env.NODE_ENV);


app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app