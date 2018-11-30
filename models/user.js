var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    profilePicture: String,
    pinnedProjects: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PinnedProjects"
      }
    }
});

// take passport local mongoose package and add methods to our user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
