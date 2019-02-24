var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function() {
  return axios.get("https://www.nytimes.com/").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];
    $(".theme-summary").each(function(i, element) {

      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

      var sum = $(this)
        .children(".summary")
        .text()
        .trim();

      if (head && sum && url) {

        var NytHead = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var NytSummary = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: NytHead,
          summary: NytSummary,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};


module.exports = scrape;