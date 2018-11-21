var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  title: String,
  subject: String,
  location: String,
  description: String,
  created: {type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  updates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Update"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    profilePicture: String
  }
});

module.exports = mongoose.model("Project", projectSchema);
