import express from 'express'
import session from 'express-session'
// import logger from 'express-logger'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import redis from 'redis'
import http from 'http'
import morgan from 'morgan'
const logger = morgan('combined')
const { sequelize } = require('./database/sequelize')
const { PORT, IP, CreateDb } = require('./configurations/index')
const RES = require('./utils/response')
// const { fire } = require('./fire')

const app = express()

/**
 * Middleware Imports
 */
const auth = require('./middlewares/auth/index')

/**
 * Controller Imports
 */

// app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: '123456',
    saveUninitialized: false,
    resave: false,
  }),
)
app.use(cors())

/**
 * Routes
 */
app.use('/test', (req, res, next) => {
  res.json(RES(200, 'Application is Running Perfectly'))
})

app.use((req, res, next) => {
  res.json(RES(404, 'Not Found'))
})

app.use((req, res, next) => {
  res.json(RES(500, 'Server Error'))
})

/**
 * Database Creation / Refreshing / Seeding
 */
if (CreateDb) {
  sequelize
    .sync({ force: true })
    .then((result: any) => {
      /**
       * Create Tables using Models
       */
    })
    .catch((err: Error) => {
      console.log('Error: ', err)
    })
}

/**
 * Main Server
 */

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Application Started at ${IP}:${PORT}`))
