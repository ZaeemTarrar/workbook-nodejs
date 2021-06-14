// Core
const { createServer } = require('http')
// Third Party
const { blue, gray, bold } = require('colors')
const express = require('express')
const app = express()
// Custom
const { R } = require('./utils/response')

/**
 * Middleware Imports
 */
const MainGate = require('./middlewares/mainGate/index')

/**
 * Middlewares
 */
app.use(MainGate)

/**
 * Routes
 */
app.use('/', (req, res, next) => {
  res.json(R(404, 'Not Found'))
})
app.use((req, res, next) => {
  res.json(R(500, 'Internal Server Error'))
})

const server = createServer(app)
server.listen(3003, () => {
  console.log(bold(blue('\nServer Started Listening ...')))
})
