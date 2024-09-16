export {};
const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        Type: String,
      },
      date_time: {
        Type: Date,
      },
    },
  ],
  // status: {
  //   type: String,
  // },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
