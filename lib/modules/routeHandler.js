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
        user = require(routeDir + 'user')(db.repositories.user),
        school = require(routeDir + 'school')(db.repositories.school),
        content = require(routeDir + 'content')(db.repositories.content),
        community = require(routeDir + 'community')(db.repositories.community),
        keyword = require(routeDir + 'keyword')(db.repositories.keyword),
        login = require(routeDir + 'login')(passport),
        register = require(routeDir + 'register')(db.repositories.register),
        search = require(routeDir + 'search')(db.repositories.search);

  app .use('/', routes)
      .use('/user', user)
      .use('/school', school)
      .use('/content', content)
      .use('/community', community)
      .use('/keyword', keyword)
      .use('/login', login)
      .use('/register', register)
      .use('/search', search)
      .use('/test', function(req, res, next) {
        res.render('test', { message: "Testey test" })
      })

}
