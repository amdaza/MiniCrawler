var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const crawlURL = function (url, done){
    return new Promise(function(resolve, reject){
        request(url, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return reject(err);
            }
            console.log("Status code: " + response.statusCode);
        
            var $ = cheerio.load(body);
        
            // Begin with http to avoid anchors
            const elements = $('a[href^="http"]');
            let links = [];
        
            fs.writeFile('hackernews.txt', '', function(){console.log('emptied')})
            elements.each(function( index ) {
                var title = $(this).text().trim();
                var link = $(this).attr('href');
                links.push({
                    title:title,
                    link:link
                })
                fs.appendFileSync('hackernews.txt', title + '\n' + link + '\n');
            });
        
            done()
            resolve (links);
            
          });
    });
}

module.exports = crawlURL;

// crawlURL("https://news.ycombinator.com/news", ()=>{
//     console.log("done")
// });