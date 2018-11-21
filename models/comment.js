var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  // text represents the comment the user can leave
  text: String,
  created: {type: Date, default: Date.now},
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    profilePicture: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
