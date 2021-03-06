var express = require('express');
var router = express.Router();


module.exports = function(userRepo){

  router.route('/')
    .get(userRepo.baseRepo.getAll)
    // TODO: delete this post. A user should register via /register.
    .post(userRepo.baseRepo.create);

  router.route('/:id')
    .get(userRepo.getById)
    .put(userRepo.baseRepo.updateById)
    .delete(userRepo.baseRepo.deleteById);

  router.route('/:id/web')
    .get(userRepo.getWeb);
    
  router.route('/:id/details')
    .get(userRepo.getDetails);
  
  router.route('/:id/content')
    .get(userRepo.getContent);

  return router;
}
