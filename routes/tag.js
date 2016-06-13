var express = require('express');
var router = express.Router();


module.exports = function(tagRepo){

  router.route('/')
    .get(tagRepo.getAll)
    .post(tagRepo.baseRepo.create);

  router.route('/:id')
    .get(tagRepo.baseRepo.getById)
    .put(tagRepo.baseRepo.updateById)
    .delete(tagRepo.baseRepo.deleteById);
    
//   router.route('/search?query=')
//     .get(tagRepo.getTags);

  return router;
}