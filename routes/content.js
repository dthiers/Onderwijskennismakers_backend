var express = require('express');
var router = express.Router();


module.exports = function(contentRepo){

  router.route('/')
    .get(contentRepo.baseRepo.getAll)
    .post(contentRepo.baseRepo.create);

  router.route('/:id')
    .get(contentRepo.baseRepo.getById)
    .put(contentRepo.baseRepo.updateById)
    .delete(contentRepo.baseRepo.deleteById);
    
  router.route('/:id/tags')
    .get(contentRepo.getTags);

  return router;
}
