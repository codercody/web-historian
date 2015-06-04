var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');


exports.handleRequest = function (req, res) {
  //check to see if request is GET or POST
  //if GET, serve static files from appropriate url


  //console.log(req.url);
  if(req.method === 'GET'){
    if(req.url === '/' || req.url === '/index.html'){
      httpHelper.serveAssets('siteAssets', res, 'index.html', function(){

      });
    }
    else if(req.url === '/styles.css'){
      httpHelper.serveAssets('siteAssets', res, 'styles.css', function(){

      });
    }
    else if(archive.isURLArchived(req.url)){
      httpHelper.serveAssets('archivedSites', res, req.url, function(){

      })
    }

    else {
      httpHelper.serveAssets('siteAssets', res, '/404.html', function(){
      })
    }
  }

};
