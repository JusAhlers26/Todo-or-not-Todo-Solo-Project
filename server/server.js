const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todo.route')
const userRoutes = require('./routes/user.route')
mongoose.set('strictQuery', true)
require('./config/mongoose.config')

app.use(express.json(), express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)


app.listen(process.env.PORT, () => {
  console.log('connected to server on port', process.env.PORT)
})

app.get('/test', (_req, res) => {
  res.send('Well it works!')
})

// mongoose.connect(process.env.DB_CONNECT)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT)
//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })