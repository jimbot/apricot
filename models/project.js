var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  title: String,
  subject: String,
  location: String,
  description: String,
  image: String,
  created: {type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Project", projectSchema);
