const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to Database')
);

//Middlewares
app.use(express.json());

//Route Middlewares
app.use(express.static('public'));

app.use('/api/user', authRoute);
app.use('/api/dashboard', dashboardRoute);

app.listen(3001,
     () => console.log('Server up and running')
);
