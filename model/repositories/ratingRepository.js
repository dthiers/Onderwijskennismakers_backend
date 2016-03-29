var Rating = require('mongoose').model('Rating');

var ratingRepository = function(){

  var self = this;

  self.getAllRatings = function(req, res, next) {
    res.json('ratingRepository');
  }

}

module.exports = ratingRepository;
