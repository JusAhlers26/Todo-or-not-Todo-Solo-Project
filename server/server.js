const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
mongoose.set('strictQuery', true);

const app = express();
app.use( express.json(), express.urlencoded({ extended: true }) );
//Port 
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//import routes
const TodoItemRoute = require('./routes/toDo.routes');


//connect to mongodb ..
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(error => console.log(error))


app.use('/', TodoItemRoute);



//connect to server
app.listen( PORT, () => console.log(`Server Connected: ${PORT}`) )