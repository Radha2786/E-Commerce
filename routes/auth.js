const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// router.get('/fakeuser', async (req,res)=>{
//     const user ={
//         email:'radhasharma2786@gmail.com',
//         username:'Radha'
//     }
//     const NewUser = await User.register(user,'radha123');   // it will automatically add username and password to the schema
//     res.send(NewUser);
// });

router.get("/register", (req, res) => {
  res.render("auth/signup");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const NewUser = await User.register(user, password);
    req.login(NewUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome! You are registered suucessfully");
      return res.redirect("/products");
    });
    // res.send(NewUser);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// router.post('/login',)

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }), //this middleware will call the method that we provided inside local strategy
  function (req, res) {
    // console.log(req.user);  //jab hum user ko authenticate karte hai to ye req.user wali cheej apni ap add ho jati hai which will contain everything about user
    req.flash("success", `Welcome back ${req.user.username} again!! `);
    console.log("Logged in successfully");
    res.redirect("/products");
  }
);

//   router.get('/logout', (req, res) => {

//     req.logout();

//     req.flash('success', 'GoodBye!!');
//     res.redirect('/products');
// })

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "GoodBye!!");
    res.redirect("/products");
  });
});

module.exports = router;
