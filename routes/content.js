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
    
  router.route('/:id/keywords')
    .get(contentRepo.getKeywords)
    .post(contentRepo.addKeyword);
    
  router.route('/:id/keywords/:keyword_id')
    .delete(contentRepo.deleteKeywordById);

  return router;
}
