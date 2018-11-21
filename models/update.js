var mongoose = require("mongoose");

var updateSchema = mongoose.Schema({
  // text represents an update the user makes
  text: String,
  created: {type: Date, default: Date.now},
  rating: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Update", updateSchema);
