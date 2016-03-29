
var File = require('mongoose').model('File');

var fileRepository = function(){
  var self = this;

  self.getAllFiles = function(req, res, next) {
    res.json('fileRepository');
  }
}

module.exports = fileRepository;
