const readline = require('readline');
const fs = require('fs');


const lasturls = function (){
  return new Promise(function(resolve, reject){
    let links = [];
    try {
      // Read lasturls.txt
      const readInterface = readline.createInterface({
        input: fs.createReadStream('lasturls.txt'),
        output: null,
        console: false
      });

      // iterate lines
      let i = 0;
      let title;
      let link;
      readInterface.on('line', function(line) {
        // console.log(i, i % 2, line);
        if (i % 2 == 0){
          title = line;
        } else {
          link = line;
          links.push({
            title: title,
            link: link
          })
        }
        i++;
      });

      readInterface.on('close', function () {
        // All lines are read, file is closed now.
        // console.log("LINKS",links)

        resolve (links);
      });

     
    } catch (error) {
      console.log(error);
      reject(error);
    }
    
  });
}

module.exports = lasturls;

//lasturls()