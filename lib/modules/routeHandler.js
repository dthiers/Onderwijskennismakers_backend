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
        tag = require(routeDir + 'tag')(db.repositories.tag),
        search = require(routeDir + 'search')(db.repositories.search);
      
  app .use('/', routes)
      .use('/user', auth, passport.authenticate('local'), user)
      .use('/school', auth, passport.authenticate('local'), school)
      .use('/content', auth, passport.authenticate('local'), content)
      .use('/community', auth, passport.authenticate('local'), community)
      .use('/keyword', auth, passport.authenticate('local'), keyword)
      .use('/login', login)
      .use('/register', register)
      .use('/search', auth, passport.authenticate('local'), search)
      .use('/tag', auth, passport.authenticate('local'), tag)
      .use('/test', auth, passport.authenticate('local'), function(req, res, next) {
        res.render('test', { message: "Testey test" })
      })
      
    var auth = function(req, res, next) { 
        req.body.email = req.get('x-email');
        req.body.password = req.get('x-password');
        next();
    }

}
