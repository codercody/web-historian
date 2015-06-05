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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var assetPath = path.join(archive.paths["siteAssets"], asset);
  //console.log(assetPath);

  fs.exists(assetPath, function(exists){
    if(exists){
      exports.sendFile(res, assetPath);
    } else {
      assetPath = path.join(archive.paths["archivedSites"], asset);
      var url = asset.slice(1);
      console.log('looking for site:', url);

      if( archive.isUrlInList(url)){
        console.log('found site:', url);

        if(archive.isURLArchived(url)){
          console.log('site is archived:', url);
          exports.sendFile(res, assetPath);
        }else{
          console.log('site still loading', url);
          res.writeHead(302, {'Location':'/loading.html'});
          res.end();
        }

      } else{
        console.log('404 on', url);
        //return a 404 status code response
        res.writeHead(404, headers);
        res.end("Not Found");
      }

    }
  });

};

exports.sendFile = function(res, assetPath ){
  fs.readFile(assetPath, 'utf-8', function(err, data){
    if(err) {
      res.writeHead(500, headers);
      res.end();
    } else {
      //write the data to the response
      res.writeHead(200, headers);
      res.end(data);
    }
  });
}
// As you progress, keep thinking about what helper functions you can put here!
