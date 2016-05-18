var express = require('express');
var router = express.Router();


module.exports = function(schoolRepo){

  router.route('/')
    .get(schoolRepo.baseRepo.getAll)
    .post(schoolRepo.baseRepo.create);

  router.route('/:id')
    .get(schoolRepo.baseRepo.getById)
    .put(schoolRepo.baseRepo.updateById)
    .delete(schoolRepo.baseRepo.deleteById);
    
  router.route('/:id/experts')
    .get(schoolRepo.getExperts);

  return router;
}
