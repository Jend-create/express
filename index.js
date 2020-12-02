//modules
require('dotenv').config()

const express = require('express');
// const { mongo, mongoose } = require('mongoose');
const mongoose = require("mongoose")

const app = express();

const dbLink = process.env.DBLINK
const port = process.env.PORT
const userRoute = require('./src/route/userRoute')

//database connection
mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
        app.listen(port,() => {
        console.info('DATABASE IS CONNECTED, SERVER IS UP!')
    })
        })
//middlewares
app.use(express.json())

// routes
app.use(userRoute)

// app.use('/about',express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hey are you in town!</h1>');
});

// app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));