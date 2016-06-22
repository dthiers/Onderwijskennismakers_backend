/**
*
* All routes are defined in this module
*
* TODO: all middleware should be required here.
*
**/

module.exports = function(app, db, passport){

    var routeDir        = "../../routes/",
        moment          = require('moment'),
        jwt             = require('jwt-simple'),
        passportModule  = require('./passport/passportModule')(passport, db.repositories.user, app),
        self            = this;

    // var authUserMiddleware = function(req, res, next) {
    //   if(typeof req.get('x-email') === 'undefined' || req.get('x-user') === 'undefined'){
    //       res.returnErr(401);
    //   } else {
    //       req.body.email = req.get('x-email');
    //       req.body.password = req.get('x-password');
    //       next();
    //   }
    // }

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
        .use('/user', user)
        .use('/school', school)
        .use('/content', content)
        .use('/community', community)
        .use('/keyword', keyword)
        .use('/login', passport.authenticate('local'), passportModule.jwt.generateJwt, login) // TODO: middleware login --> JWT
        .use('/register', register)
        .use('/search', search)
        .use('/tag', tag)
        .use('/test', passportModule.jwt.authJwt, function(req, res, next) {
            res.render('test', { message: "Testey test" })
        })
        .use('/test2', passportModule.jwt.authJwt, function(req, res, next) {
          res.json('YOUVE MADE IT!');
        })
}
