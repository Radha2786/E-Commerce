const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride=require('method-override'); // for sending patch request

mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-app")
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
    console.log(error);
  });

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("ejs", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});

// Routes
const productRoutes = require("./routes/products");

const reviewRoutes = require("./routes/reviews");

app.use(productRoutes);

app.use(reviewRoutes);
