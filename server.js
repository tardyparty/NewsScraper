const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 8090;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";

mongoose.connect(MONGODB_URI);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let databaseUrl = "scraper";
let collections = ["scrapedData"];

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes");

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
