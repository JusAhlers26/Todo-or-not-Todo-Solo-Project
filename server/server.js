const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const dotenv = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5500;

require('./config/mongoose.config')

app.use( express.json(), express.urlencoded({ extended: true }) )

app.use(cors({ origin: 'http://localhost:3000'}))

const TodoItemRoute = require('./routes/todo.route')
app.use('/', TodoItemRoute)
// const Authorize = require('./routes/user.route')
// app.use('/auth', Authorize)



//connect to server
app.listen( PORT, () => console.log(`Server connected on port: ${PORT}`) )
app.get('/test', (req, res) =>{
    res.send('Well it works!')
})