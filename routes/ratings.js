var express = require('express');
var router = express.Router();

var ratings = function(ratingRepo) {

  router.route('/')
    .get(ratingRepo.getAllRatings);

  return router;
}

module.exports = ratings;
