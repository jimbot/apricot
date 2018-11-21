var express = require("express");
var router = express.Router({mergeParams: true});
var Project = require("../models/project");
var Comment = require("../models/comment");

// COMMENTS
// app.get("/projects/:id/comments/new", function(req, res){
//   Project.findById(req.params.id, function(err, project){
//     if(err){
//       console.log(err);
//     } else {
//       res.render("comments/new", {project: project});
//     }
//   });
// });

router.post("/projects/:id/comments", isLoggedIn, function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.author.profilePicture = req.user.profilePicture;
          comment.save();
          project.comments.push(comment);
          project.save();
          res.redirect("/projects/" + project._id);
        }
      });
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
