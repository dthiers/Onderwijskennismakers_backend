var express = require('express');
var router = express.Router();


module.exports = function(userRepo){

  router.route('/')
    .get(userRepo.baseRepo.getAll)
    .put(userRepo.baseRepo.updateById)
    .post(userRepo.createUser);

  router.route('/:id')
    .get(userRepo.baseRepo.getById)
    .put(userRepo.baseRepo.updateById)
    .delete(userRepo.baseRepo.deleteById);

  return router;
}
