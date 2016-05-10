var express = require('express');
var router = express.Router();


module.exports = function(keywordRepo){

  router.route('/')
    .get(keywordRepo.baseRepo.getAll)
    .post(keywordRepo.baseRepo.create);

  router.route('/:id')
    .get(keywordRepo.baseRepo.getById)
    .put(keywordRepo.baseRepo.updateById)
    .delete(keywordRepo.baseRepo.deleteById);

  return router;
}
