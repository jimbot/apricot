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
  Project.create(req.body.project, function(err, newProject){
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
