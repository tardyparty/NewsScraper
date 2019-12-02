const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  heading: String
})