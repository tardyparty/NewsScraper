const db = require('../models');

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.scrapedData.find({}, function(error, found) {
      if (error) {
        console.log(error);
      }
      else {
        let data = { article: found }
        res.render("index", data);
      }
    });
  });
}

