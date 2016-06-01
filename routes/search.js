var express = require('express');
var router = express.Router();

module.exports = function(searchRepo){
    router.route('/:query')
        .get(searchRepo.search)

    return router;
}
