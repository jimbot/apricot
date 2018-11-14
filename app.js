var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    // for authentication
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    // for schemas
    User = require("./models/user");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://jc1995:apricot112@ds163013.mlab.com:63013/apricot", {useNewUrlParser: true});
// secret helps encode and decode the session for authentication
app.use(require("express-session")({
    secret: "project apricot for comp1930",
    resave: false,
    saveUninitialized: false
}));
// you need the below two lines when you want to use passport
app.use(passport.initialize());
app.use(passport.session());
// using the serialize and deserialize as defined by passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// MONGOOSE SCHEMAS CONFIG
var projectSchema = new mongoose.Schema({
  title: String,
  subject: String,
  location: String,
  description: String,
  created: {type: Date, default: Date.now}
});

var Project = mongoose.model("Project", projectSchema);

// RESTFUL ROUTES

app.get("/projects", function(req, res){
  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    } else {
      res.render("index", {projects: projects});
    }
  });
});

// ROUTES
//===============
// AUTH ROUTES
// show sign up form
app.get("/register", function(req, res){
  res.render("register");
});
// handling user sign up
app.post("/register", function(req, res){
  req.body.username;
  req.body.password;
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    });
  });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
  res.render("login");
});
// login logic
// middleware
app.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failtureRedirect: "/login"
}), function(req, res){
});
//logout
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// creating projects
// new ROUTE
app.get("/projects/new", function(req, res){
  res.render("new");
});

// create ROUTE
app.post("/projects", function(req, res){
  Project.create(req.body.project, function(err, newProject){
    if(err){
      res.render("new");
    } else {
      res.redirect("/projects")
    }
  });
});

app.get("/pinned", function(req, res){
  res.render("pinned");
});

app.get("/profile", function(req, res){
  res.render("profile");
});

app.get("/", function(req, res){
  res.render("landing");
});

//keep at bottom
app.listen(3000, function(){
  console.log("listening on localhost: 3000");
});
