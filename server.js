const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRouter = require('./routes/category');
const RestaurantRouter = require('./routes/restaurant');
const FoodRouter = require('./routes/food');
dotenv.config();
mongoose.connect(process.env.MONGOURI)
    .then(() => console.log("Foodly Database connected"))
    .catch((err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/category', CategoryRouter);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/foods", FoodRouter);

app.listen(process.env.PORT, () => console.log(`Foodly app listening on port ${process.env.PORT}!`))    