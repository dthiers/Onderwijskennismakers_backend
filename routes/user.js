var express = require('express');
var router = express.Router();


module.exports = function(userRepo){

  router.route('/')
    .get(userRepo.baseRepo.getAll)
    .post(userRepo.baseRepo.create);

  router.route('/:id')
    .get(userRepo.baseRepo.getById)
    .put(userRepo.baseRepo.updateById)
    .delete(userRepo.baseRepo.deleteById);

  return router;
}
