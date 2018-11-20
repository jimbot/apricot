var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    // for authentication
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    // for schemas
    User = require("./models/user");
    Project = require("./models/project");
    Comment = require("./models/comment");

    var commentRoutes = require("./routes/comments"),
        projectRoutes = require("./routes/projects"),
        indexRoutes = require("./routes/index");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://jc1995:apricot112@ds163013.mlab.com:63013/apricot", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/apricot", {useNewUrlParser: true});
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

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/projects", projectRoutes);
app.use(commentRoutes);

//keep at bottom
// app.listen(process.env.PORT || 5000, function(){
//   console.log("listening on localhost: 3000");
// });

app.listen(3000, function(){
  console.log("listening on localhost: 3000");
});
