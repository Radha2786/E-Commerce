const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override"); // for sending patch request
const session = require("express-session");
const User = require('./models/user');
var passport = require("passport");
var LocalStrategy = require("passport-local");



const flash = require("connect-flash");
app.use(
  session({
    secret: "thisisnotagoodsecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {  httpOnly: true,    // koi agar js ke through cookie ko access karna chahe and manipuate so he can not after setting this http method
      expires:Date.now() +1000*60*60*24*7*1,
      maxAge:  1000*60*60*24*7*1 
    }
  })
);
app.use(flash());

app.use(passport.initialize()); // to initialize passport and prepare it to handle authentication requests 
app.use(passport.session());

passport.serializeUser(User.serializeUser());  // to store User's session
passport.deserializeUser(User.deserializeUser());  // to remove User's session

passport.use(new LocalStrategy(User.authenticate())); // go through passport documentation , here using npm local-mongoose package static method we are authenticating the user

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

app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});

app.use((req, res, next) => {
  res.locals.CurrentUser = req.user;   // current user jo logged in hai vo har template par display hoga
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const productRoutes = require("./routes/products");

const reviewRoutes = require("./routes/reviews");

const authRoutes = require("./routes/auth");

app.use(productRoutes);

app.use(reviewRoutes);
app.use(authRoutes);
