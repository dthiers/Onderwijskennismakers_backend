var express = require('express');
var router = express.Router();


module.exports = function(communityRepo){

  router.route('/')
    .get(communityRepo.baseRepo.getAll)
    .put(communityRepo.baseRepo.updateById)
    .post(communityRepo.createCommunity);

  router.route('/:id')
    .get(communityRepo.baseRepo.getById)
    .put(communityRepo.baseRepo.updateById)
    .delete(communityRepo.baseRepo.deleteById);

  return router;
}
