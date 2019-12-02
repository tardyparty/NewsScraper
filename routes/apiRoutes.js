// packages
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

// set up file
const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";

mongoose.connect(MONGODB_URI);

// functions
module.exports = function(app) {
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
      
        res.redirect("/");
    });
  });
}
