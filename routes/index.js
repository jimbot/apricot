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
router.post("/register", usernameToLowerCase, function(req, res){
  var pics = [
    "http://gdurl.com/XG8G",
    "http://gdurl.com/nrjZ",
    "http://gdurl.com/M5Fd"
  ];
  var num = Math.floor((Math.random() * 2));
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePicture: pics[num]
  });
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
router.post("/login", usernameToLowerCase, passport.authenticate("local", {
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

function usernameToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
}

function genRandProfilePic(req, res, next){
  // random number between 0 and 21
  var num = Math.floor((Math.random() * 21));
  req.body.profilePicture = "../userProfiles/" + num + ".jpg";
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
