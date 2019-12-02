const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentShema = new Schema({
  comment: String
});

var Comment = mongoose.model("Comment", CommentShema);

module.exports = Comment;