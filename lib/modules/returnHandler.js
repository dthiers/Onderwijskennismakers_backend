/**
*
* Handle return requests as a middleware
*
**/

module.exports = function(req, res, next){
  var self = this;

  self.getHeaderFormat = function(){
    
  }
  res.return = function(){

  }

  console.log('Je moede ris een return handler');
  next();

}
