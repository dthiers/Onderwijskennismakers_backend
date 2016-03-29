var express = require('express');
var router = express.Router();


module.exports = function(communityRepo) {
  router.route('/')
    .get(communityRepo.getAllCommunities);

  return router;
};
