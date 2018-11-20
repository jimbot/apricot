var express = require("express");
var router = express.Router();
var Project = require("../models/project")

// creating projects
// new ROUTE
router.get("/", function(req, res){

  Project.find({}, function(err, projects){
    if(err){
      console.log(err);
    } else {
      res.render("projects/index", {projects: projects});
    }
  });
});

router.get("/new", isLoggedIn, function(req, res){
  res.render("projects/new");
});

// create ROUTE
router.post("/", function(req, res){
  var title = req.body.title;
  var subject = req.body.subject;
  var location = req.body.location;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }

  var newProject = {title: title, subject: subject, location: location, description: description, author: author};

  Project.create(newProject, function(err, newlyCreated){
    if(err){
      res.render("new");
    } else {
      res.redirect("/projects")
    }
  });
});

// SHOW
router.get("/:id", function(req, res){
  Project.findById(req.params.id).populate("comments").exec(function(err, foundProject){
    if(err){
      res.redirect("/projects");
    } else {
      res.render("projects/show", {project: foundProject});
    }
  });
});

router.get("/pinned", function(req, res){
  res.render("projects/pinned");
});

// DELETE ROUTE
router.delete("/:id", isLoggedIn, function(req, res){
  Project.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/projects");
    } else {
      res.redirect("/projects");
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
