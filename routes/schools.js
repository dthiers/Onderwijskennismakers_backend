var express = require('express');
var router = express.Router();


module.exports = function(schoolRepo) {
  router.route('/')
    .get(schoolRepo.getAllSchools);

  return router;
};
