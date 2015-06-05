var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');


exports.handleRequest = function (req, res) {

  //console.log(req.url);
  if (req.method === 'GET') {
    var url = req.url === '/' ? '/index.html' : req.url;
    httpHelper.serveAssets(res, url);
  }

  if (req.method === 'POST') {
    var newUrl = '';
    req.on('data', function(chunk){
      newUrl += chunk;
    });

    req.on('end', function(){
      newUrl = newUrl.slice(4);
      //check newUrl is already in sites
      if(archive.isUrlInList(newUrl)){
        res.writeHead(302, {'Location':'/' + newUrl });
        res.end();
      } else {
        // insert the new url to our list in sites.txt
        archive.addUrlToList(newUrl);
        res.writeHead(302, {'Location':'/loading.html'});
        res.end();
      }
    });
  }

};
