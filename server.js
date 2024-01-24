const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
mongoose.connect(process.env.MONGOURI)
    .then(() => console.log("Foodly Database connected"))
    .catch((err) => console.log(err));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Foodly app listening on port ${process.env.PORT}!`))    