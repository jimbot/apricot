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
  var temp = [
    "https://i.imgur.com/s11FC6a.jpg",
    "https://i.imgur.com/yRL2B75.jpg",
    "https://i.imgur.com/a8x9yNn.jpg",
    "https://i.imgur.com/fbI8YX3.jpg",
    "https://i.imgur.com/doWmlMF.jpg",
    "https://i.imgur.com/jqQbMwv.jpg",
    "https://i.imgur.com/9SV8l8J.jpg",
    "https://i.imgur.com/E3IVuYR.jpg",
    "https://i.imgur.com/p5LMaNO.jpg",
    "https://i.imgur.com/LSxrKkC.jpg",
    "https://i.imgur.com/ZsU18RH.jpg",
    "https://i.imgur.com/jz62sV0.jpg",
    "https://i.imgur.com/y0sVg20.jpg",
    "https://i.imgur.com/3vdlodF.jpg",
    "https://i.imgur.com/8Y9w8K8.jpg",
    "https://i.imgur.com/diyedJ9.jpg",
    "https://i.imgur.com/PZRZJ91.jpg",
    "https://i.imgur.com/0IvBke6.jpg",
    "https://i.imgur.com/IpKxyzP.jpg",
    "https://i.imgur.com/P2un1WU.jpg",
    "https://i.imgur.com/G1zStbw.jpg",
    "https://i.imgur.com/sRUc4h2.jpg"
  ];
  var num = Math.floor((Math.random() * (temp.length - 1)));
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePicture: temp[num]
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
