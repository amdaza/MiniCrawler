var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

const crawlURL = function (url){
    return new Promise(function(resolve, reject){
        request(url, function(error, response, body) {

            // Check errors
            if(error || !stringIsAValidUrl(url) 
                || response.statusCode < 200 || response.statusCode >= 300) {
                console.log("Error: " + error);
                return reject(error);
            }
        
            var $ = cheerio.load(body);
        
            // Begin with http to avoid anchors
            const elements = $('a[href^="http"]');
            let links = [];
        
            // Empty lasturls.txt
            fs.writeFile('lasturls.txt', '', function(){
                //console.log('emptied')
            })

            // Iterate links
            elements.each(function( index ) {
                // Save in links array
                var title = $(this).text().trim();
                var link = $(this).attr('href');
                links.push({
                    title:title,
                    link:link
                })

                // Save for next call
                fs.appendFileSync('lasturls.txt', title + '\n' + link + '\n');
            });
        
            resolve (links);
            
          });
    });
}

module.exports = crawlURL;

// TEST
// crawlURL("https://news.ycombinator.com/news", ()=>{
//     console.log("done")
// });