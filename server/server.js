const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')

const todoRoute = require('./routes/todo.route')
const userRoute = require('./routes/user.route')
mongoose.set('strictQuery', true)
require('./config/mongoose.config')

app.use(express.json(), express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/todos', todoRoute)
app.use('/api/user', userRoute)


app.listen(process.env.PORT, () => {
  console.log('connected to server on port', process.env.PORT)
})

app.get('/test', (_req, res) => {
  res.send('Well it works!')
})