const express = require('express');
const mongojs = require('mongojs');
const axios = require('axios');
const cheerio = require('cheerio');

let databaseUrl = "scraper";
let collections = ["scrapedData"];

let db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

