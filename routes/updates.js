var express = require("express");
var router = express.Router({mergeParams: true});
var Project = require("../models/project");
var Update = require("../models/update");

router.post("/projects/:id/updates", checkProjectOwnership, function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err){
      console.log(err);
    } else {
      Update.create(req.body.update, function(err, update){
        if(err){
          console.log(err);
        } else {
          update.author.id = req.user._id;
          update.author.username = req.user.username;
          update.save();
          project.updates.push(update);
          project.save();
          res.redirect("/projects/" + project._id);
        }
      });
    }
  });
});

// MIDDLEWARE
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
