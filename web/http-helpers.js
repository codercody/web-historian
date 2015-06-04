var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(source, res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var assetPath = path.join(archive.paths[source], asset);
  //console.log(assetPath);
  //if file asset exists
  fs.exists(assetPath, function(exists){
    if(exists){

      //open the file contents and send them to the reponse
      //var context = fs.readFileSync(path);
      fs.readFile(assetPath, 'utf-8', function(err, data){
        if(err) {
          res.writeHead(500, headers);
          res.end();
        } else {
          //write the data to the response
          res.writeHead(200, headers);
          res.end(data);
        }
        //callback();
      });


    } else {
      //return a 404 status code response
      res.writeHead(404, headers);
      //invoke the callback
      res.end();
    }
  });

}

// As you progress, keep thinking about what helper functions you can put here!
