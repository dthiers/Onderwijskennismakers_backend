var express = require('express');
var router = express.Router();

var files = function(fileRepo) {
  router.route('/')
    .get(fileRepo.getAllFiles);

  return router;
}

module.exports = files;
