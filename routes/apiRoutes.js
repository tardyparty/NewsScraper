const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const db = require("../models/Article");

const app = express();

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  axios
    .get("http://news.mit.edu/topic/robotics/")
    .then(function(response) {

      let $ = cheerio.load(response.data);

      $(".views-row").each(function(i, element) {

        let result = {};

        result.title = $(this)
          .children("title.a")
          .text();
        result.link = $(this)
          .children("title.a")
          .attr("href");
        result.summary = $(this)
          .children("p")
          .text();

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          })
      });
    
      res.send("Scrape Complete");
  });
});
