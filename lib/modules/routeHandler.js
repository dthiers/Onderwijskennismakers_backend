/**
*
* All routes are defined in this module
*
* TODO: all middleware should be required here.
*
**/

module.exports = function(app, db, passport){

  var routeDir = '../../routes/';


  // Routes
  var   routes = require(routeDir + 'index'),
        user = require(routeDir + 'user')(db.repositories.user)
        community = require(routeDir + 'community')(db.repositories.community),
        login = require(routeDir + 'login')(passport);

  app.use('/', routes);
  app.use('/user', user);
  app.use('/community', community);
  app.use('/login', login);
  app.use('/test', function(req, res, next) {
    res.render('test', { message: "Test tste"})
  })


}
