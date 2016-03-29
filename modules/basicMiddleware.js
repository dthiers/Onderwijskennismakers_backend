// Basic middleware


var middleware = function(req, res, next){
  // Params is leeg
  console.log(req.query);

  if(req.user){
    // TODO: check if user exists in database
    if(req.user.username === "Dion Thiers"){
      req.messages = {msg: "Helllooo"};
      console.log("Signed in as: " + req.user.username);
      next();
    }
  } else {
    console.log('we dont have a user');
  }
}

module.exports = middleware;
