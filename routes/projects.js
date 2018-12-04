var express = require("express");
var router = express.Router();
var Project = require("../models/project")

// HOME PAGE
router.get("/", function(req, res){
  Project.find({}).populate("updates").exec(function(err, projects){
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

// all pinned projects
router.get("/pinned", isLoggedIn, function(req, res){
  Project.find({}).populate("updates").exec(function(err, projects){
    if(err){
      console.log(err);
    } else {
      res.render("projects/pinned", {projects: projects});
    }
  });
  // res.render("projects/pinned");
});

// get the pin request
router.post("/pin/:id", isLoggedIn, function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err){
      console.log(err);
    } else {
      req.user.pinnedProjects.push(project);
      req.user.save();
      res.redirect("/projects");
      console.log(req.user.pinnedProjects);
    }
  });
});

// create ROUTE
router.post("/", function(req, res){
  var title = req.body.title;
  var subject = req.body.subject;
  var location = req.body.location;
  var description = req.body.description;
  // var image = req.body.image;
  var author = {
      id: req.user._id,
      username: req.user.username,
      profilePicture: req.user.profilePicture
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
// Project Details
router.get("/:id", function(req, res){
  Project.findById(req.params.id).populate("comments").populate("updates").exec(function(err, foundProject){
    if(err){
      res.redirect("/projects");
    } else {
      res.render("projects/show", {project: foundProject});
    }
  });
});

// DELETE ROUTE
router.delete("/:id", checkProjectOwnership, function(req, res){
  Project.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/projects");
    } else {
      res.redirect("/projects");
    }
  });
});

// PIN PROJECT ROUTE
router.post("/pin/:id", isLoggedIn, function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err){
      console.log(err);
    } else {
        req.currentUser.pinnedProjects.push(project);
        req.currentUser.save();
        res.redirect("/projects");
    }
  });
});

// MIDDLEWARE BELOW
function checkProjectOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Project.findById(req.params.id, function(err, foundProject){
      if(err){
        res.redirect("back");
      } else {
        if(foundProject.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
