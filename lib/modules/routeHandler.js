/**
*
* All routes are defined in this module
*
* TODO: all middleware should be required here.
*
**/

module.exports = function(app, db){

  var routeDir = '../../routes/';


  // Routes
  var   routes = require(routeDir + 'index'),
        user = require(routeDir + 'user')(db.repositories.user);

  app.use('/', routes);
  app.use('/user', user);
  app.use('/test', function(req, res, next) {
    res.render('test', { message: "Test teste"})
  })


}
