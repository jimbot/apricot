var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
  res.render("landing");
});

// AUTH ROUTES
// show sign up form
router.get("/register", function(req, res){
  res.render("register");
});

// handling user sign up
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/projects/profile");
    });
  });
});

// LOGIN ROUTES
//render login form
router.get("/login", function(req, res){
  res.render("login");
});

// login logic
// middleware
router.post("/login", passport.authenticate("local", {
  successRedirect: "/projects",
  failtureRedirect: "/login"
}), function(req, res){
});

//logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// Profile and Pinned

router.get("/profile", isLoggedIn, function(req, res){
  res.render("profile");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
